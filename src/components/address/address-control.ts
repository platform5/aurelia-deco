import { bindable, computedFrom, bindingMode, inject, NewInstance } from 'aurelia-framework';
import { countries } from 'aurelia-resources';
import { HttpClient } from 'aurelia-fetch-client';

@inject(NewInstance.of(HttpClient))
export class AddressControl {
  @bindable({defaultBindingMode: bindingMode.twoWay}) public value: any;
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public dense: boolean = false;
  @bindable public disabled: boolean = false;
  @bindable public countryType: 'input' | 'list' = 'input';
  @bindable public countryList: 'all' | Array<string> = 'all';
  @bindable public labels: string[] = [];
  @bindable public dicoContext = '';
  @bindable public allowDescription = false;
  @bindable public allowLatLngEdition = false;

  private ready: boolean = false;

  constructor(private httpClient: HttpClient) {

  }

  public bind() {
    this.fixValue();
  }

  public valueChanged() {
    this.fixValue();
  }

  public fixValue() {
    this.ready = false;
    if (!this.value || typeof this.value !== 'object') {
      this.value = {}
    }
    this.ready = true;
  }

  @computedFrom('countryList')
  public get computedCountryList(): Array<string> {
    if (this.countryList === 'all') {
      return countries.map(c => c.name);
    } else if (Array.isArray(this.countryList)) {
      return this.countryList;
    } else {
      return [];
    }
  }

  context() {
    return this.dicoContext ? this.dicoContext + '.' : '';
  }

  public addressChanged() {
    this.fetchLatLng();
  }

  public async fetchLatLng(): Promise<void> {
    // https://api3.geo.admin.ch/rest/services/api/SearchServer?searchText=SEARCH_VALUE&type=locations
    if (this.value?.street && this.value?.zip && this.value?.city && this.value?.country) {
      if (this.value.country === 'Suisse') {
        this.httpClient.configure((config) => {
          config.withBaseUrl('https://api3.geo.admin.ch/rest/services/api');
        });
        try {
          const searchValue = `${this.value.street}, ${this.value.zip} ${this.value.city}`;
          const response = await this.httpClient.get(`/SearchServer?searchText=${encodeURIComponent(searchValue)}&type=locations`);
          const value = await response.json();
          if (value?.results.length) {
            const firstResult = value.results[0];
            const lat = firstResult?.attrs?.lat;
            const lng = firstResult?.attrs?.lon;
            if (typeof lat === 'number' && typeof lng === 'number') {
              this.value.lat = lat;
              this.value.lng = lng;
            }
          }
        } catch (error) {
          console.warn('Error when fetch lat lng', error.message);
        }
      }
    }
  }
}

/*
// fetch lat lng anytime the address changes value

// below is previous idea
1. If the fields for lat / lng are not displayed => fetch lat / lng when address is ready
2. If the fields are displayed but no value => fetch lat / lng when address is ready
3. If the fields are displayed and have a value => only fetch on request (button)
*/