# DT-Backend-Challenges
# Event Management API

API Documentation for the Event Management API.

## Base URL

`http://localhost:3000/api/v3/app`

## Endpoints

### Retrieve an Event by ID

Retrieve an event by its unique ID.

- Method: GET
- Endpoint: `/events?id=:event_id`
- Parameters:
  - `id` (required): The ID of the event to retrieve.

### Retrieve Events with Filters

Retrieve a list of events with optional filters.

- Method: GET
- Endpoint: `/events/filters?type=latest&limit=5&page=1`
- Parameters:
  - `type` (optional): The type of events to retrieve. Currently supports only "latest".
  - `limit` (optional): The maximum number of events to retrieve per page (default: 5).
  - `page` (optional): The page number of events to retrieve (default: 1).

### Create a New Event

Create a new event with the provided details.

- Method: POST
- Endpoint: `/events/:id`
- Parameters:
  - `id` (required): The ID of the event (not used for creation, can be any value).
- Request Body: JSON object representing the event details.

### Update Multiple Events

Update multiple events with the provided details.

- Method: PUT
- Endpoint: `/events`
- Parameters: None
- Request Body: JSON object representing the updated event details.

### Delete All Events

Delete all events.

- Method: DELETE
- Endpoint: `/events`
- Parameters: None

For detailed information on request/response formats and examples, please refer to the API documentation or consult the code implementation.

## Usage

You can use the Event Management API to perform various operations related to event management. Please refer to the API documentation for specific details on each endpoint.

## License

This project is licensed under the [MIT License](LICENSE).
