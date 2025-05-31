import { EventBus } from "@root/app/domains/eventBus/utils/eventBus/eventBus";
import { TUiBus } from "../../types/uiBus.types";

export const uiBus: TUiBus = new EventBus();