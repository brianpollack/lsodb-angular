import { Component, OnInit, ViewChild } from "@angular/core";
declare let places;
declare let L;

@Component({
  selector: "app-search-place",
  templateUrl: "./search-place.component.html",
  styleUrls: ["./search-place.component.scss"],
})
export class SearchPlaceComponent implements OnInit {
  @ViewChild("input", { static: false }) inputMap;
  private instance: any = null;

  // map variables
  map: any;
  markers = [];
  marker:any;
  markerIcon = L.icon({
    iconUrl: "../../assets/img/maker-cow-01.svg",
    iconSize: [100, 100],
    iconAnchor: [50, 80],
    // popupAnchor: [100, -100],
  });

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.addMap();
    }, 1000);
  }

  ngAfterViewInit() {
    this.autoComplete();
  }

  /* addMap() {
    let url1 =
      "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    let url2 = "https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png";

    let osm = L.tileLayer(url1, {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
    // .addTo(this.map);

    this.map = L.map("leafLetmap")
      .addLayer(osm)
      .setView([22.998851594142913, 78.44238281249999], 4);

    this.marker = new L.marker([22.998851594142913, 78.44238281249999], {
      // draggable: "true",
      // autoPan: "true",
      icon: this.markerIcon,
    }).addTo(this.map);

    // this.map.on("click", <LeafletMouseEvent>(e) => this.mapClicked(e));

    // this.marker.on("dragend", <LeafletMouseEvent>(e) => this.markerDragEnd(e));
  } */

  addMap() {
    this.map = new L.map("leafLetmap", {
      scrollWheelZoom: false,
      zoomControl: false,
    });

    let osm = new L.TileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        // minZoom: 1,
        // maxZoom: 13,
        attribution:
          'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      }
    );

    this.marker = new L.marker([22.998851594142913, 78.44238281249999], {
      // draggable: "true",
      // autoPan: "true",
      icon: this.markerIcon,
    }).addTo(this.map);

    this.map.setView([22.998851594142913, 78.44238281249999], 4);
    this.map.addLayer(osm);
  }

  autoComplete() {
    this.instance = places({
      appId: "pl6M28ZJIIFM",
      apiKey: "6e4b81520a26ea955c5b3b831ba84955",
      container: this.inputMap.nativeElement,
      // type: this.type
    });

    // this.instance.on('suggestions', e => this.onSuggestion(e))

    

    this.instance.on("clear", e => this.onClear(e));
    // this.instance.on('cursorchanged', e => this.handleOnCursorchanged(e));
    this.instance.on('change', e => this.handleOnChange(e));
  }

  onSuggestion(e) {
    console.log("onSuggestion",e)
    /* this.markers.forEach(this.removeMarker);
    this.markers = [];

    if (e.suggestions.length === 0) {
      this.map.setView(new L.LatLng(0, 0), 1);
      return;
    }

    e.suggestions.forEach(this.addMarker);
    this.findBestZoom(); */
  }

  handleOnCursorchanged(e){
    console.log("OnCursorchanged",e)
  }

  handleOnChange(e){
    console.log("Change", e);
    var position = e.suggestion.latlng;
    

    this.marker.setLatLng(new L.LatLng(position.lat, position.lng));
    this.map.panTo(new L.LatLng(position.lat, position.lng));
    // this.map.panBy([200, 300]);
    this.map.setView([position.lat, position.lng], 13)

  }

  onClear(e) {
    console.log("Clear",e);
  }



   addMarker(suggestion) {
    this.marker = new L.marker( [suggestion.latlng.lat,suggestion.latlng.lng ], {opacity: .4});
    console.log(this.marker);
    this.marker.addTo(this.map);
    // this.markers.push(this.marker);
  }

   removeMarker(marker) {
    this.map.removeLayer(marker);
  }

   findBestZoom() {
    var featureGroup = L.featureGroup(this.markers);
    this.map.fitBounds(featureGroup.getBounds().pad(0.5), {animate: false});
  }
  
}
