import { Pipe, PipeTransform } from "@angular/core";
import { IItineraryItem } from "../models/itineraryItem";

@Pipe({
	name: "filterEvents",
})
export class FilterEventsPipe implements PipeTransform {
	transform(events: IItineraryItem[], filterDate: Date): IItineraryItem[] {
		return events.sort(
			(x, y) => +new Date(x.startTime) - +new Date(y.startTime)
		);
	}
}
