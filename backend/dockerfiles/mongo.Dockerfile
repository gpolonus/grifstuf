
  # mongo:
    # image: mongo:latest
    # ports:
    #   - "27017:27017"
    # command:
    #   - --storageEngine=wiredTiger
    # volumes:
    #   - data:/data/db
    # logging:
    #   driver: none

FROM mongo:latest


# Define mountable directories.
VOLUME ["data:/data/db"]
