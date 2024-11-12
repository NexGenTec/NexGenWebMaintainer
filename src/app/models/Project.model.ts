export interface Project {
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate?: Date;
    plannedStartDate: Date;
    plannedEndDate: Date;
    budget?: number;
    objectives: string[];
    status: 'active' | 'completed' | 'onHold' | 'canceled';
    teamMembers: string[];
    tasks: Task[];
}
