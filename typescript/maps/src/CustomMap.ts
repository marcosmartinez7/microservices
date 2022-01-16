export interface Mappable{
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string
  color: string;
}

export class CustomMap { 
  private map: google.maps.Map;
  addMarker(mappable: Mappable){
    const marker = new google.maps.Marker({
      map:this.map,
      position:{
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });
    marker.addListener('click', ()=>{
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      })
      infoWindow.open(this.map, marker);
    })
  }

  constructor (divId: string){
    this.map =  new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
    
  }
}

