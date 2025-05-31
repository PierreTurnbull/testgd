import { Component } from "@root/app/common/components/component.models";
import { TCardinality, TRelation } from "../../types/relation.types";

export class CRelation<T extends TCardinality> extends Component {
	constructor(
		relation: TRelation<T>,
	) {
		super();

		this.relation = relation;
	}

	relation: TRelation<T>;
}