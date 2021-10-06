import { bindable, computedFrom, bindingMode } from 'aurelia-framework';
import { countries } from 'aurelia-resources';

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
}