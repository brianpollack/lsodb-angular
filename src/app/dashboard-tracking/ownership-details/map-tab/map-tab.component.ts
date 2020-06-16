import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ObservableService } from "./../../../services/observable.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from "@angular/forms";
import { MapServiceService } from "src/app/services/map/map-service.service";
import { TosterType, mapType } from "../../../enum/enums";
import * as _ from "lodash";

declare let L;

@Component({
  selector: "app-map-tab",
  templateUrl: "./map-tab.component.html",
  styleUrls: ["./map-tab.component.scss"],
})
export class MapTabComponent implements OnInit, OnChanges {

 @Output() navigateTo = new EventEmitter<any>();
 @Input() tabValue: any;

  public map: any;
  public marker: any;
  mapLocationForm: FormGroup;

  markerIcon = L.icon({
    iconUrl: "../../assets/img/maker-cow-01.svg",
    iconSize: [100, 100],
    iconAnchor: [50, 80],
    // popupAnchor: [100, -100],
  });

  locationData = {
    country: "",
    countryCode: "",
    state: "",
    stateCode: "",
    district: "",
    taluk: "",
    town: "",
    village: "",
    lat: "",
    lng: "",
  };

  constructor(
    private observableService: ObservableService,
    private fb: FormBuilder,
    private mapService: MapServiceService
  ) {
    console.log("constructor map");

    this.observableService.navigateTab().subscribe((data) => {
      if (data.tabName === "MAP") {
        console.log("Map", data);
        this.searchForm.setValue({
          search: data.place
        })
        setTimeout(() => {
          this.addMap();
        }, 1000);
      } else {
        console.log("not MAP tab!!");
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {

    
    // console.log(changes);
    if(!changes.tabValue.firstChange){
      setTimeout(() => {
        this.addMap();
      }, 1000);
      this.searchForm.setValue({
        search: changes.tabValue.currentValue['place']
      })
    }
    
  }

  ngOnInit() {
    // ========== mapLocation Form group ===========
    this.mapLocationForm = this.fb.group({
      country: [""],
      countryCode: [""],
      state: [""],
      stateCode: [""],
      district: [""],
      taluk: [""],
      town: [""],
      village: [""],
      lat: [""],
      lng: [""],
    });

    // set form values
    this.initMapData();
  }

  backTab() {
    let changetab = {
      tabName: "ADD"
    };  

    this.navigateTo.emit(changetab);
    
  }

  addMap() {
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
      draggable: "true",
      autoPan: "true",
      icon: this.markerIcon,
    }).addTo(this.map);

    this.map.on("click", <LeafletMouseEvent>(e) => this.mapClicked(e));

    this.marker.on("dragend", <LeafletMouseEvent>(e) => this.markerDragEnd(e));
  }

  // ==== init map data ====

  setForm(data): void {
    this.mapLocationForm.setValue({
      country: data.country,
      countryCode: data.countryCode,
      state: data.state,
      stateCode: data.stateCode,
      district: data.district,
      taluk: data.taluk,
      town: data.town,
      village: data.village,
      lat: data.lat,
      lng: data.lng,
    });
  }

  // ============== map initite form data ==============
  initMapData(): void {
    this.locationData.country = "";
    this.locationData.countryCode = "";
    this.locationData.state = "";
    this.locationData.stateCode = "";
    this.locationData.district = "";
    this.locationData.taluk = "";
    this.locationData.town = "";
    this.locationData.village = "";
    this.locationData.lat = "";
    this.locationData.lng = "";
  }

  // ========= search form group ===========
  searchForm = this.fb.group({
    search: ["", Validators.required],
    // searchList: ["", Validators.required]
  });

  // ============= find place on map ================
  findPlaceOnMap(mapPlace) {
    /* Set up params to send to Nominatim */
    var params = {
      // Defaults
      q: mapPlace.search,
      format: "json",
      addressdetails: 1,
      limit: 1,
      polygon_geojson: 1,
    };
    const url =
      "https://nominatim.openstreetmap.org/search" +
      L.Util.getParamString(params);

    this.mapService.getlocation(url).subscribe(
      (res) => {
        this.markOnMap(res);
      },
      (err) => {
        this.observableService.setTosterMsg({
          type: "error",
          title: "Request failed",
          message: err,
        });
      }
    );
  }

  json(response) {
    return response.json();
  }

  // =============  marker on map ===========
  markOnMap(results) {
    this.initMapData();

    if (results.length !== 0) {
      let mapData = results[0];
      let bbox = mapData.boundingbox;
      console.log(mapData);

      let first = L.latLng(bbox[0], bbox[2]);
      let second = L.latLng(bbox[1], bbox[3]);

      
     
      this.setFormData(mapData);

      // this.setForm(this.locationData);

      let bounds = L.latLngBounds([first, second]);
      this.map.fitBounds(bounds);
    

      this.marker.setLatLng(new L.LatLng(mapData.lat, mapData.lon));
      this.map.panTo(new L.LatLng(mapData.lat, mapData.lon));
    } else {
      this.observableService.setTosterMsg({
        type: TosterType.WARNING,
        title: "wrong spelling",
        message: "Check the spelling before seaching!",
      });
    }
  }

//================= set form data =====================
  setFormData(mapData){

    let searchData = this.searchForm.value;
    this.initMapData();

    this.locationData.country = mapData.address.country;
    this.locationData.countryCode = _.upperCase(mapData.address.country_code);
    this.locationData.state = mapData.address.state;
    this.locationData.district = mapData.address.state_district;
    if ("county" in mapData.address ) {
      this.locationData.taluk = mapData.address.county;
    }

    if("town" in mapData.address){
      this.locationData.town = mapData.address.town;
      // this.locationData.town =  mapData.address.suburb;
    }else if("suburb" in mapData.address && searchData.search !== mapData.address.suburb){
      this.locationData.town = mapData.address.suburb;
    }

    if ("village" in mapData.address ) {
      this.locationData.village = mapData.address.village;
    }else if("suburb" in mapData.address && _.startCase(searchData.search) === mapData.address.suburb){
      this.locationData.village = mapData.address.suburb;
    }


    this.locationData.lat = mapData.lat;
    this.locationData.lng = mapData.lon;

    this.setForm(this.locationData);

  }

  // =============== search form submit =============
  onSubmit(searchDirective: FormGroupDirective) {
    this.findPlaceOnMap(this.searchForm.value);
  }

  // =========== map marker drag ==============
  markerDragEnd(e) {
    var position = e.target._latlng;
    console.log("Draged position", e);

    this.marker.setLatLng(new L.LatLng(position.lat, position.lng));
    this.map.panTo(new L.LatLng(position.lat, position.lng));
    this.locationData.lat = position.lat;
    this.locationData.lng = position.lng;

    this.setForm(this.locationData);
  }

  // ========= map  onclick ==============
  mapClicked(e) {
    var position = e.latlng;
    console.log("clicked position", e);

    this.marker.setLatLng(new L.LatLng(position.lat, position.lng));
    this.map.panTo(new L.LatLng(position.lat, position.lng));

    var params = {
      format: "jsonv2",
      lat: position.lat,
      lon: position.lng,
    };
    const url =
      "https://nominatim.openstreetmap.org/reverse" +
      L.Util.getParamString(params);


      this.mapService.getClickLocation(url).subscribe(
        res => {
          console.log(res)
          this.setFormData(res);
        },
        err => {
          this.observableService.setTosterMsg({
            type: "error",
            title: "Request failed",
            message: err,
          });
        }
      )

    /* this.locationData.lat = position.lat;
    this.locationData.lng = position.lng; */

    // this.setForm(this.locationData);
  }

  locationSubmit(mapLocationDirective: FormGroupDirective){
    this.locateData(this.locationData);
  }
  locateData(data){
    let changetab = {
      country: data.country,
      state: data.state,
      district: data.district,
      taluk: data.taluk,
      town: data.town,
      village: data.village,
      lat: data.lat,
      log: data.lng,
      tabName: "ADD",
      fromTab: "MAP"
    }

    this.navigateTo.emit(changetab);
  }
}
