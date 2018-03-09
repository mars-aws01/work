import { Pipe, PipeTransform } from '@angular/core';
import { Colors } from '../entities/monitor/statistic'

@Pipe({name:'messageColor'})
export class MessageColorPipe implements PipeTransform{
    transform(messageType: string): string 
    {
        let filterColor = Colors.filter(item => item.MessageTypeName == messageType);
		if(null == filterColor || undefined == filterColor || filterColor.length<=0){
			return "black";
		}
		return filterColor[0].color;
    }
}