#!/bin/bash
export INFISICAL_TOKEN=$(cat /run/secrets/infisical_token)
exec "$@"