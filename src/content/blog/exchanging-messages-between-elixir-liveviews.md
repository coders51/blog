---
title: "Exchanging messages between clients when using Phoenix LiveView"
description: "For an internal project we needed to exchange messages between web clients while using Phoenix LiveView as backend. This is a description of the solution we implemented."
author: "Igor Cappello"
keywords: ["elixir", "liveview", "phoenix", "pubsub"]
pubDate: "25-03-2025 18:00"
timeRead: "20"
heroImage: "exchanging-messages-between-elixir-liveviews/liveview-broadcast-with-pubsub.png"
---

## A bit of context

While developing a small application for an internal demo, we found that we needed to exchange messages between the clients using the application (the description of which could be another blogpost on its own).

The backend we decided to use to support the application was based on Elixir, in particular on [Phoenix LiveView](https://hexdocs.pm/phoenix_live_view/Phoenix.LiveView.html). The exchange of messages between clients is not available out-of-the-box, but as we found out it is relatively easy to implement and to tailor to one's needs.

## Elixir Phoenix and LiveView

As stated in the documentation, **LiveViews are processes that receive events, update their state, and render updates to a page as diffs** . To implement our solution, we took advantage mainly of the fact that LiveViews are [processes in the erlang/Elixir sense](https://hexdocs.pm/elixir/Process.html), and that each client is connected to a different LiveView process, each one with its own state and life cycle.

Phoenix comes out of the box with a [PubSub module](https://hexdocs.pm/phoenix_pubsub/Phoenix.PubSub.html) that supports the excahge of broadcast messages between Elixir processes. But what's special about Elixir processes? Each Elixir process has its own mailbox that maintains ordering. We can decide to interact with a process synchronously (meaning that we proceed when the process is done handling our message) or asynchronously (meaning that as soon as the message is in the mailbox, we can proceed). The mapping between Elixir process and system threads/processes is handled by the BEAM (Erlang VM) process, so we don't have to worry about that.

From now on, when we talk about processes, we will refer to _Elixir processes_.

## The solution

As we said earlier, we need to be able to deliver a message, generated from a web client (a browser in our case), either to one specific client or to all the active client at that moment. To support both these use-cases, we decided to introduce the concept of a `Registry` in our backend: a stateful process maintaining a list of all the active LiveViews in the system. Aside from that, we also took advantage of the `PubSub` module that comes out of the box with Phoenix and use it to implement the needed broadcast feature.

For the purposes of this blogpost, this is is the relevant sequence of events:

1. a new client connects to the application (in our case `http://localhost:4000/client`)
2. a new LiveView process is instantiated and connected to this client
3. the new LiveView process registers itself to the `Registry` module and subscribes itself to the `PubSub` module
4. when a new process registers itself (meaning there is a **new user**), the `Registry` module sends a broadcast message using the `PubSub` module
5. the other active LiveView processes receive the broadcast message and relay it to the connected clients
6. the connected clients send back a **response** message to their respective LiveView processes, that forward them to the `Registry` module
7. all the responses have a specific recipient, so the `Registry` module does not need to involve a broadcast message, and can target the correct LiveView process
8. the correct LiveView process relays the response message to the correct client

The points from 1. to 5. are representend in Figure 1, where `client 1` is the new client connecting to the application. The broadcast message is sent by the `Registry` process using the `PubSub` module, to which all the LiveView processes are subscribed. Note that the process denoted by `LV1` receives the broadcast message as well, but does not forward it to `client 1` (forwarding a **new user** message to the newly connected client does not make sense in our context).

![Figure 1](/posts/exchanging-messages-between-elixir-liveviews/liveview-broadcast-with-pubsub.png)
_Figure 1: broadcast message when a new client connects_

The points from 6. to .8 are represented in Figure 2, where `client 3` generates the **response** message for `client 1`. The message is sent to the LiveView process `LV3` that uses the `Registry` to forward it directly to `LV1` using the `Registry`. Finally, `client 1` receives the response.

![Figure 2](/posts/exchanging-messages-between-elixir-liveviews/liveview-direct-message.png)
_Figure 2: unicast response message_

## Code snippets

Here we will collect the most interesting snippets of code for the application described in this article. The complete source code repository can be found [here](https://github.com/coders51/exchange-messages-between-elixir-liveviews).

### The Registry process

The `Registry` is a [GenServer](https://hexdocs.pm/elixir/GenServer.html) (a stateful process with a specific interface and life cycle).

In our implementation the domain API implemented by the module is composed by two functions `send_client_info` and `send_client_response`. Both send a _cast_ message (async message) to the `Registry` process proper.

```elixir
  @impl true
  def handle_cast({:send_client_info, payload}, state) do
    %{id: client_session_id, pid: pid} = payload
    new_state = add_client(state, client_session_id, pid)

    broadcast_message = %{
      event_type: :broadcast,
      event_name: :new_user,
      payload: payload |> Map.delete(:pid)
    }

    Phoenix.PubSub.broadcast(Demo.PubSub, get_topic(), broadcast_message)
    {:noreply, new_state}
  end
```

When a `:send_client_info` message is received, the `Registry` process will first record the sender as a new client in its state, then prepare a broadcast message and send it to a specific topic using the `PubSub` module.

```elixir
  @impl true
  def handle_cast({:send_client_response, payload}, state) do
    %{
      "client_session_id" => client_session_id,
      "recipient" => recipient_session_id
    } = payload

    sender = get_client(state, client_session_id)
    recipient = get_client(state, recipient_session_id)

    forward_message(sender, recipient, :client_response, payload)

    {:noreply, state}
  end

  defp forward_message(%Client{} = from, %Client{} = to, event_name, payload) do
    Logger.debug("Forwarding message #{event_name} from #{inspect(from)} to #{inspect(to)}")

    msg = %{event_type: :singlecast, event_name: event_name, payload: payload}
    Process.send(to.liveview_pid, msg, [])
  end
```

When a `:send_client_response` message is received, the `Registry` process will search for the sender and recipient references in its state, then if the references have been correctly found, forward the message to the recipient with an `info` message (this is also an _async_ message).

### LiveView process registration to `Registry` and `PubSub`

After the LiveView page is correctly mounted, the client application pushes an event that is received by the LiveView process.

```javascript
Hooks.Client = {
  mounted() {
    //... other stuff

    //sending the first message after startup
    this.pushEvent("client_helo", {
      payload: { name: `new-user-${rnd()}` },
    });
  },
};
```

On the server side, in the matching event handler we collect the payload, generate a unique session id for the current LiveView process, subscribe to the relevant `PubSub` topic and notify the `Registry` of the existence of a new client. Note that we save the session id in the `assigns` for the socket in use.

```elixir
  def handle_event("client_helo", %{"payload" => payload}, socket) do
    Logger.info("TestLive client_helo #{inspect(payload)} #{inspect(self())}")
    # event triggered on the frontend
    %{"name" => client_name} = payload
    client_session_id = UUID.autogenerate()
    Phoenix.PubSub.subscribe(Demo.PubSub, Registry.get_topic())
    Registry.send_client_info(client_session_id, self(), client_name)
    {:noreply, assign(socket, :client_session_id, client_session_id)}
  end
```

### Forwarding messages from LiveView to the client

To handle broadcast messages sent by the `Registry` via the `PubSub` module, we can use the `handle_info` callback in the LiveView module

```elixir
def handle_info(
        %{event_type: :broadcast, event_name: :new_user, payload: payload} = evt,
        socket
      ) do
    Logger.info("TestLive handle_info broadcast #{inspect(evt)}")

    # Registry sent a broacast message about a new user.
    # Let's forward the info to our specific client, if we are not the `new user`.
    %{id: sender} = payload
    %{client_session_id: current_session} = socket.assigns

    socket =
      maybe_forward_message(
        sender != current_session,
        socket,
        evt.event_name,
        payload
      )

    {:noreply, socket}
  end

   defp maybe_forward_message(true, socket, event_name, payload) do
    socket |> push_event(event_name, payload)
  end

  defp maybe_forward_message(false, socket, _, _), do: socket
```

We can use the information sent by the `Registry` to determine if we need to forward the broadcast message to the client linked to the current LiveView process by comparing the sender id and the session id saved in the socket assigns. If they differ, we call `push_event` and forward the message to the client.

### Handling the notification on the client

On the client side, this message is handled by registering a callback using `handleEvent` . In our application, the callback responds directly to the server with a direct `client_response` . Notice that a specific recipient is defined.

```javascript
Hooks.Client = {
  mounted() {
    //custom events sent from the LiveView process
    this.handleEvent(`new_user`, (newUserPayload) => {
      console.log(`new user`, newUserPayload);
      this.pushEvent("client_response", {
        payload: {
          message: `hello there ${newUserPayload.name}`,
          recipient: newUserPayload.id,
        },
      });
    });
    //... other stuff
  },
};
```

### Handling direct messages

As before, we use `handle_event` in the LiveView module to define how we want to handle the `client_response` message.

```elixir
  def handle_event("client_response", %{"payload" => payload}, socket) do
    # event triggered on the frontend
    %{client_session_id: current_session} = socket.assigns
    %{"recipient" => recipient_session_id} = payload
    Registry.send_client_response(current_session, recipient_session_id, payload)
    {:noreply, socket}
  end
```

In this case we want to forward the message using the `Registry`. The message is forwarded if both the sender and the recipent are saved in the `Registry` state.

```elixir
  def handle_cast({:send_client_response, payload}, state) do
    %{
      "client_session_id" => client_session_id,
      "recipient" => recipient_session_id
    } = payload

    sender = get_client(state, client_session_id)
    recipient = get_client(state, recipient_session_id)

    forward_message(sender, recipient, :client_response, payload)

    {:noreply, state}
  end

  defp forward_message(%Client{} = from, %Client{} = to, event_name, payload) do
    Logger.debug("Forwarding message #{event_name} from #{inspect(from)} to #{inspect(to)}")

    msg = %{event_type: :singlecast, event_name: event_name, payload: payload}
    Process.send(to.liveview_pid, msg, [])
  end
```

The receiving LiveView process defines another `handle_info` function clause to match this message.

```elixir
  def handle_info(%{event_type: :singlecast, event_name: event_name, payload: payload}, socket) do
    Logger.info("TestLive handle_info siglecast #{inspect(event_name)} #{inspect(payload)}")
    # Registry sent a direct message.
    # Let's forward the info to our specific client, if it is meant for us (it should)
    %{"recipient" => recipient} = payload
    %{client_session_id: current_session} = socket.assigns

    socket =
      maybe_forward_message(
        recipient == current_session,
        socket,
        event_name,
        payload
      )

    {:noreply, socket}
  end
```

On the client side, this message is handled as before with a matching `handleEvent` callback.

## Conclusion

We have seen one way in which we can exchange messages between clients when LiveViews are used, both in a direct way or using broadcasting. The whole example [is available here](https://github.com/coders51/exchange-messages-between-elixir-liveviews).
