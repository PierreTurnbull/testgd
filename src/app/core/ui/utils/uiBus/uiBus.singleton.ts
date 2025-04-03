import { EventBus } from "@root/app/common/utils/eventBus/eventBus";
import { TUiBus } from "../../types/uiBus.types";

export const uiBus: TUiBus = new EventBus();