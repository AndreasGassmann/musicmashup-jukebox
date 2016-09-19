import {Pipe} from '@angular/core';

@Pipe({
    name: 'VideoDurationPipe'
})

export class VideoDurationPipe
{
    transform(value, args) {
        let string = new Date(value * 1000).toISOString().substr(11, 8);
        if (string.substr(0, 3) === '00:') string = string.substr(3);
        return string;
    }
}
