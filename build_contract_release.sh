#!/usr/bin/env bash
set -e

projectRootPath=$(realpath "$0" | sed 's|\(.*\)/.*|\1|' | cd ../ | pwd)

# if the operative system is running arm64, append -arm64 to workspace-optimizer. Otherwise not
arch=$(uname -m)

docker_options=(
	--rm
	-v "$projectRootPath":/code
	--mount type=volume,source="$(basename "$projectRootPath")_cache",target=/target
	--mount type=volume,source=registry_cache,target=/usr/local/cargo/registry
)

if [[ "$arch" == "aarch64" || "$arch" == "arm64" ]]; then
	docker_command=("docker" "run" "${docker_options[@]}" "cosmwasm/rust-optimizer-arm64:0.14.0")
else
	docker_command=("docker" "run" "${docker_options[@]}" "cosmwasm/rust-optimizer:0.14.0")
fi

echo "${docker_command[@]}"

"${docker_command[@]}"


