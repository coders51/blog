---
title: 'An introduction to Rabbit Streams'
description: 'A first approach to the newish streams feature, what they are and how to use them'
author: 'Luca Menghini'
keywords: ["rabbit", "stream", "streams", "rabbitmq"]
pubDate: '07-30-2024 10:00'
heroImage: 'rabbit-streams/hero.png'
timeRead: '20'
draft: true
---

## Introduction
So, we all know about RabbitMQ, the world's most loved message broker, right? We at coders51 use it, like, all the time: it's our go-to solution to asynchronous communication between different services. It's performant, reliable, battle-tested, and written in Erlang (which helps with the reliability and performance parts). What is not to love?
But, did you know about the good word? That Rabbit has introduced Streams?
This is a somewhat less known feature that has been around for about 3 years now, first as a plugin and then as a native feature (more on that later).
Basically, a stream is a persistent, append-only log of messages that allows for high-throughput publishing and consumption, where messages are retained and can be re-read multiple times by consumers, enabling use cases such as event sourcing, replay, and long-term storage of event data. Obviously, messages in a stream do not need to stay in the stream indefinetely: we can also define retention policies so that messages that are not considered relevant anymore can be archived or destroyed.
Isn't that basically what a Kafka topic is? Not quite, but close. We'll revisit this point later.

## Differences between Stream Plugin and native Streams
Just like we anticipated earlier, Streams were first introduced as a plugin and then implemented as a native feature: but the plugin still exists and is basically the standard way in which streams are used.
This is due to the fact that in order to achieve the high throughput that one might expect and need from a stream, it's best to use a different protocol from AMQP0.9.1, one especially developed for this specific use case.
So, while you could define a stream and interact with it using the usual AMQP0.9.1 protocol (and that's the "native" support of streams), if you wanted to fully leverage the power of streams you'd do best enabling the plugin and interacting with those streams using the dedicated binary protocol.
The catch? The usual AMQP clients do not support this protocol, so in order to use it you'll have to add a new dependencies to your app. Stream clients are available for most of the mainstream languages - you can find the full list [here](https://www.rabbitmq.com/docs/stream).
Shameless plug: we at coders51 developed the one for node - let us know what you think.
It is also important to mention that there are a couple of features, namely SuperStreams and Sub Entry batching which are available only through the plugin. More on the SuperStreams shortly.

### Smart client, dumb broker
Now, if you have ever worked with RabbitMQ, you might recall that in RabbitMQ all the routing is done on the broker's side through the definition of queues, exchanges and bindings: this is usually summed up through the "dumb client / smart broker" dichotomy. With the streams protocol, the opposite actually applies: most of the logic is done on the client. This is quite important, for example, in the context of SuperStreams, and is one of the reasons why that feature is not available without the plugin.

### SuperStreams
So, earlier we mentioned that a RabbitMQ stream is similar in some regards to a Kafka topic, but not quite. That is because a stream is not partitioned: it's usually replicated in clusters just like a vanilla `quorum` queue, but there is no concept akin to a partition, i.e. the stream is not actually distributed, so having multiple applications consuming from a single stream in parallel might prove challenging.
No worries: SuperStreams are here, and they have partitions just like the one you might know from Kafka. 
A SuperStream is basically a collection of "vanilla" streams, which are referred in this context as "partitions", and every time we publish to this SuperStream (which is seen by the end user of the client as a single entity) we extract a routing key which shall be used to decide on which actual partition we should publish. By providing a "routing key extractor" callback we can guarantee that multiple messages that share some property are published to the same partition, just like in Kafka. And just like in Kafka, we can either subscribe to a single partition (by creating a consumer for a stream) or we can subscribe to all partitions, by creating a SuperStream consumer. And just like in Kafka, ordering is not guaranteed cross-partitions. Looks pretty close to me.

## Performances
The [official site](https://www.rabbitmq.com/docs/stream-core-plugin-comparison) mantains that, using the binary protocol, a client can consume several millions of messages per second. This obviously is very dependent on the performances of the client: both in terms of code, which library/language we are using, and by the machine the client is running on. My own experience is that you don't always break the million messages per second threshold, but the performance is always at least one or two orders of magnitude greater than by using the AMQP protocol.

## What is your use case?
Now, you might be asking yourself: alright, what is all of this good for anyways? Here are some ideas.

### Large fan-outs
Here the streams really shine, since with streams there is no need for routing done server side through the exchanges: every subscriber can consume from the same stream without interfering with the others.

### Replay / time traveling
With streams nothing is destroyed unless we explicitly instruct the broker to do so through strict retention policies. This mitigates the risk of losing data - we can always recover from a previous snapshot and replay all the messages after a specific offset.

### Log aggregation
Do you need a single place where every log produced by your stack eventually ends up in? A stream again might be the solution you are looking for.

### Data pipeline
Maybe you have in place a multi-step procedure to transform data, and would like to connect each step to the next - this is also an issue in which RabbitMQ streams shine.



