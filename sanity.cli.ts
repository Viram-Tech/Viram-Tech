import { defineCliConfig } from "sanity/cli";

import { dataset, projectId } from "./sanity/env";

export default defineCliConfig({
  api: { projectId, dataset },
  deployment: { appId: "j2ny9z2ep4vqspnhcuf2les1" },
});
