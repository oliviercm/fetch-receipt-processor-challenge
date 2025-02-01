# fetch-receipt-processor-challenge

See https://github.com/fetch-rewards/receipt-processor-challenge.

## Running the application/server

Requires Docker.

```bash
# Execute from project root:

docker compose up --build
```

### Changing the accessible server port from 3000

Map the desired host port to the container's port 3000 using the `compose.yaml` file located in the project root:

```diff
services:
  server:
    build:
      context: .
    environment:
      NODE_ENV: production
    ports:
-      - 3000:3000
+      - 80:3000 # Access the server from the default HTTP port on the host
```

## Running tests

```bash
# Execute from project root:

docker build --progress=plain --no-cache --target=test .
```