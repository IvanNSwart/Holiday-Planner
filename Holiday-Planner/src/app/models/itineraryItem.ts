export interface IItineraryItem {
	id: string;
	name: string;
	tag: string;
	tripId: string;
	endTime: Date;
	startTime: Date;
	cost: number;
}
