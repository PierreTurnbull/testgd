# generate the worker in ts
cat src/app/features/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/getCanLinkNodes.ts src/app/features/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/utils/getCanLinkNodes.workerBase.ts > src/app/features/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.ts
# compile the worker in js
esbuild --bundle src/app/features/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.ts --outfile=src/app/features/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.js
# clean temporary files
rm src/app/features/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.ts