# generate the worker in ts
cat src/app/domains/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/getCanLinkNodes.ts src/app/domains/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/utils/getCanLinkNodes.workerBase.ts > src/app/domains/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.ts
# compile the worker in js
esbuild --bundle src/app/domains/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.ts --outfile=src/app/domains/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.js
# clean temporary files
rm src/app/domains/pathfinding/utils/createVisibilityGraph/createLinkedNodes/getCanLinkNodes/worker/compiled/getCanLinkNodes.worker.ts