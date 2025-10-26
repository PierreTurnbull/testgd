import { EventBus } from "@root/app/features/eventBus/utils/eventBus/eventBus";
import { TUiBus } from "../../types/uiBus.types";

export const uiBus: TUiBus = new EventBus();