import {Pipe} from '@angular/core';

@Pipe({
  name: 'MessageTimePipe'
})

export class MessageTimePipe
{

  transform(value, args?) {

    var result:string;
    // current time
    let now = new Date().getTime();

    // time since message was sent in seconds
    let delta = (now - (value)) / 1000;

    // format string
    if (delta < 10)
    {
      result = 'just now';
    }
    else if (delta < 60)
    { // sent in last minute
      result = Math.floor(delta) + ' Seconds ago';
    }
    else if (delta < 3600)
    { // sent in last hour
      result = Math.floor(delta / 60) + ' Minutes ago';
    }
    else if (delta < 86400)
    { // sent on last day
      result = Math.floor(delta / 3600) + ' Hours ago';
    }
    else
    { // sent more than one day ago
      result = Math.floor(delta / 86400) + ' Day ago';
    }
    return result;
  }
}
