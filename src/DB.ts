
export interface Salary {
	year: number;
	salary: number;
	currency: string;
}

export interface State {
	salaries: Salary[];
}

export enum ActionType {
	AddSalary,
	RemoveSalary,
}

interface AddSalary {
	type: ActionType.AddSalary;
	salary: Salary;
}

interface RemoveSalary {
	type: ActionType.RemoveSalary;
	index: number;
}

export type Action = AddSalary | RemoveSalary;

export const Dispatch = (state: State, action: Action): State => {
	switch (action.type) {
		case ActionType.AddSalary: {
			const salaries = [...state.salaries, action.salary].sort((a, b) => a.year - b.year);
			return {
				salaries,
			};
		}
		case ActionType.RemoveSalary: {
			return {
				salaries: state.salaries.slice(0, action.index).concat(state.salaries.slice(action.index + 1)),
			};
		}
	}
};