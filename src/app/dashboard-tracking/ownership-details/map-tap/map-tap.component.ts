import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroupDirective,
  FormGroup,
} from "@angular/forms";
import { ObservableService } from "./../../../services/observable.service"
// import { ObservableService } from "./../../services/observable.service";
import { IMapLocation } from "src/app/models/maplocation";
import { MapServiceService } from "src/app/services/map/map-service.service";
import { TosterType, mapType } from "../../../enum/enums";
import * as _ from "lodash";
// declare variable
//  import { * as  L } from '../../asserts/leaflet/leaflet';

declare let L: any;

@Component({
  selector: 'app-map-tap',
  templateUrl: './map-tap.component.html',
  styleUrls: ['./map-tap.component.scss']
})
export class MapTapComponent implements OnInit {

  public map: any;
  public marker: any;

  locationData = {
    country: "",
    countryCode: "",
    state: "",
    stateCode: "",
    district: "",
    taluk: "",
    town: "",
    village: "",
    pincode: "",
    suburb: "",
    lat: "",
    lng: "",
  };

  mapLocationForm: FormGroup;

  // markerIcon = L.icon({
  //   iconUrl: "../../assets/leaflet/images/marker-icon.png",
  //   shadowUrl: "../../assets/leaflet/images/marker-icon.png",
  // });


  markerIcon = L.icon({
    iconUrl: "../../assets/img/maker-cow-01.svg",
    iconSize: [100, 100],
    iconAnchor: [50, 80],
    // popupAnchor: [100, -100],
  });

  constructor(
    private fb: FormBuilder,
    private observableService: ObservableService,
    private mapService: MapServiceService
  ) { }



  ngOnInit() {
    // let osm = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    //   attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // })

    // let url =
    //   "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    // let url =
    //   "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    let url =
      "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    // let url =
    //   "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    // let url =
    //   "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    // let url =
    //   "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    // let url =
    //   "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=0044ae63e2434d1380cf37327d6677b6";

    let osm = L.tileLayer(url, {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    // .addTo(map);
    this.map = L.map("map")
      .addLayer(osm)
      .setView([22.998851594142913, 78.44238281249999], 4);

    this.marker = new L.marker([22.998851594142913, 78.44238281249999], {
      draggable: "true",
      autoPan: "true",
      icon: this.markerIcon,
    }).addTo(this.map);

    this.map.on("click", <LeafletMouseEvent>(e) => this.mapClicked(e));

    this.marker.on("dragend", <LeafletMouseEvent>(e) => this.markerDragEnd(e));

    // this.marker.on("click", <LeafletMouseEvent>(e) => this.markerClicked(e));

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
      suburb: [""],
      pincode: [""],
      lat: [""],
      lng: [""],
    });

    // set form values
    this.initMapData();
  }

  // ==== init map data ====

  initFormData(data): void {
    this.mapLocationForm.setValue({
      country: data.country,
      countryCode: data.countryCode,
      state: data.state,
      stateCode: data.stateCode,
      district: data.district,
      taluk: data.taluk,
      town: data.town,
      village: data.village,
      suburb: data.suburb,
      pincode: data.pincode,
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
    this.locationData.pincode = "";
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

      let first = L.latLng(bbox[0], bbox[2]);
      let second = L.latLng(bbox[1], bbox[3]);

      this.locationData.country = mapData.address.country;
      this.locationData.countryCode = _.upperCase(mapData.address.country_code);

      this.locationData.state = mapData.address.state;
      this.locationData.district = mapData.address.state_district;

      if (mapData.type === mapType.ADMINISTRATIVE) {
        this.locationData.taluk = mapData.address.county;
      }

      this.locationData.lat = mapData.lat;
      this.locationData.lng = mapData.lon;

      if (mapData.type === mapType.VILLAGE) {
        this.locationData.village = mapData.address.village;
        this.locationData.taluk = mapData.address.county;
      }

      if ("postcode" in mapData.address) {
        this.locationData.pincode = mapData.address.postcode;
      }

      if ("suburb" in mapData.address) {
        this.locationData.suburb = mapData.address.suburb;
      }

      this.initFormData(this.locationData);

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

  // =============== search form submit =============
  onSubmit(searchDirective: FormGroupDirective) {
    this.findPlaceOnMap(this.searchForm.value);
  }

  // =========== map marker drag ==============
  markerDragEnd(e) {
    var position = e.target._latlng;
    console.log(position);

    this.marker.setLatLng(new L.LatLng(position.lat, position.lng));
    this.map.panTo(new L.LatLng(position.lat, position.lng));
    this.locationData.lat = position.lat;
    this.locationData.lng = position.lng;

    this.initFormData(this.locationData);
  }

  // markerClicked(e) {
  //   var position = this.marker.getLatLang();
  //   this.marker.addTo(this.map).bindPopup(`${position}`).openPopup().update();

  // }

  // ========= map  onclick ==============
  mapClicked(e) {
    var position = e.latlng;
    console.log(position);

    this.marker.setLatLng(new L.LatLng(position.lat, position.lng));
    this.map.panTo(new L.LatLng(position.lat, position.lng));
    this.locationData.lat = position.lat;
    this.locationData.lng = position.lng;

    this.initFormData(this.locationData);
  }
}
