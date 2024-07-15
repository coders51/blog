---
title: 'Rabbit Streams'
description: 'An introduction to Rabbit Streams'
author: 'Luca Menghini'
keywords: ["rabbit", "stream", "streams", "rabbitmq"]
pubDate: '07-16-2024 10:00'
heroImage: 'rabbit-streams/hero.png'
timeRead: '20'
draft: true
---

## Introduction
So, we all know about RabbitMQ, the world's most loved message broker, right? We at coders51 use it, like, all the time: it's our go-to solution to asynchronous communication between different services. It's performant, reliable, battle-tested, and written in Erlang (which helps with the reliability and performance parts). What is not to love?
But, did you know about the good word? That RabbitMQ can basically substitute Kafka in your infrastructure?
This is a somewhat less known feature that has been around for about 3 years now, first as a plugin and then as a native feature (more on that later).
Basically, a stream is a persistent, append-only log of messages that allows for high-throughput publishing and consumption, where messages are retained and can be re-read multiple times by consumers, enabling use cases such as event sourcing, replay, and long-term storage of event data. Obviously, messages in a stream do not need to stay in the stream indefinetely: we also have the tools to define a retention policy so that messages that are not considered relevant anymore can be archived or destroyed.
Isn't that basically what a Kafka topic is? Not quite, but close. We'll revisit this point later.

## Differences between Stream Plugin and native Streams
Just like we anticipated earlier, Streams were first introduced as a plugin and then implemented as a native feature: but the plugin still exists and is basically the standard way in which streams are used. How so? 
This is due to the fact that in order to achieve the high throughput that one might expect and need from a stream, it's best to use a different protocol from AMQP0.9.1, a protocol especially developed for this specific use case.
So, while you could define a stream and interact with it using the usual AMQP0.9.1 protocol (and that's the "native" support of streams), if you wanted to leverage the power of streams fully you'd do best enabling the plugin and interacting with those streams using the Osiris protocol.
The catch? The usual AMQP clients do not support this protocol, and you'll have to add a new dependencies to your app. Stream clients are available for most of the mainstream languages - here's the list. Shameless plug: we at coders51 developed the one for node - let us know what you think.
Also there are a couple of features, namely SuperStreams and Sub Entry batching which are available only thru the plugin. More on the SuperStreams shortly.

### Smart client, dumb broker
Now, if you have ever worked with RabbitMQ, you might recall that in RabbitMQ all the routing is done on the broker's side through the definition of queues, exchanges and bindings: this is usually surmised with the "dumb client / smart broker" dichotomy. With the streams protocol, the opposite actually applies: most of the logic is done client-wise. This is quite important, for example, in the context of SuperStreams, and is one of the reasons why that feature is not available without the plugin.

### SuperStreams
So, earlier we mentioned that a RabbitMQ stream is similar in some regards to a Kafka topic, but not quite. That is because a stream is not partitioned: it's usually replicated in clusters just like a vanilla quorum queue, but there is no concept akin to a partition, i.e. the stream is not actually distributed, so having multiple applications consuming from a single stream in parallel might prove challenging.
No worries: SuperStreams are here, and they have partitions just like the one you might know from Kafka. 
A SuperStream is basically a collection of "vanilla" streams, which are referred in this context as "partitions", and every time we publish to this SuperStream (which is seen by the end user of the client as a single entity) we extract a routing key which shall be used to decide on which actual partition we should publish. By providing a "routing key extractor" callback we can guarantee that multiple messages that share some property are published to the same partition, just like in Kafka. And just like in Kafka, we can either subscribe to a single partition (by creating a consumer for a stream) or we can subscribe to all partitions, by creating a SuperStream consumer. And just like in Kafka, ordering is not guaranteed cross-partitions. Looks pretty close to me.

### Why you might want to use RabbitMQ streams instead of Kafka
Because you already got Rabbit and it can do both. Why have two services in your infrastructure that do basically the same thing when you can limit your complexity to one?
Kafka is still a little bit faster though in throughput, so if you really are challenging the boundaries of Kafka maybe it's better if you keep using that.

## Performances and benchmarking
Now, the RabbitMQ site tells us this. 
But we want to double check and I've run the test on my machine, which is a three years old laptop with a bunch of crap running on.
Here's what I've found

### Stream plugin
==WIP==

### Stream native
==WIP==

### Now, let's compare it to Kafka, same machine
==WIP==

## What is your use case?
Now, you might be asking yourself: alright, what is all of this good for anyways? Here are some ideas.

### Event Sourcing
If you are looking to do some EventSourcing, a RabbitMQ stream might be a low hanging fruit for an event store. Some more specific products, free or otherwise, are available but I find that what a stream offers is more than enough to cover most cases.

### Log aggregation
Do you need a single place where every log produced by your stack eventually ends up in? A stream again might be the solution you are looking for.

### Data pipeline
Maybe you have in place a multi-step procedure to transform data, and would like to connect each step to the next - this is also an issue in which RabbitMQ streams shine.



