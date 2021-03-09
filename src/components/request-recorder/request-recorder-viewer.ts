import { RequestRecorder } from './../../helpers/request-recorder';
import { inject, computedFrom } from 'aurelia-framework';
import { UxModalService } from '@aurelia-ux/modal';

@inject(RequestRecorder,  UxModalService)
export class RequestRecorderViewer {

  public artillery: string;

  constructor(private recorder: RequestRecorder, private modalService:  UxModalService) {}

  public dismiss() {
    this.modalService.cancel();
  }

  @computedFrom('recorder.varById')
  get capturedIds(): Array<string> {
    return Object.keys(this.recorder.varById);
  }

  @computedFrom('recorder.idByVar')
  get capturedVars(): Array<string> {
    return Object.keys(this.recorder.idByVar);
  }

  capturedValue(key: string) {
    return this.recorder.idByVar[key];
  }

  capturedVar(key: string) {
    return this.recorder.varById[key];
  }

  public generateArtillery() {
    this.artillery = '';
    let lines: Array<{level: number, text: string}> = [];
    for (let request of this.recorder.requests.filter(i => i.keep)) {
      const expectProperties = request.expectProperties.filter(i => i.type !== 'ignore');
      lines.push({level: 2, text: `- ${request.method.toLowerCase()}:`});
      lines.push({level: 4, text: `url: "${request.testUrl}"`});
      if (request.testHeaders) {
        lines.push({level: 4, text: 'headers:'});
        for (let key in request.testHeaders) {
          lines.push({level: 5, text: `${key}: "${request.testHeaders[key]}"`});
        }
      }
      if (request.testBody) {
        lines.push({level: 4, text: 'json:'});
        for (let key in request.testBody) {
          const val = request.testBody[key];
          if (typeof val === 'string') {
            lines.push({level: 5, text: `${key}: "${val}"`});
          } else if (typeof val === 'number') {
            lines.push({level: 5, text: `${key}: ${val}`});
          } else {
            lines.push({level: 5, text: `${key}: ${JSON.stringify(val)}`});
          }
        }
      }
      if (request.captures && Object.keys(request.captures).length > 0) {
        lines.push({level: 4, text: 'capture:'});
        for (let key in request.captures) {
          lines.push({level: 5, text: `- json: ${key}`});
          lines.push({level: 6, text: `as: ${request.captures[key]}`});
        }
      }
      if (request.expectStatusCode || expectProperties.length > 0) {
        lines.push({level: 4, text: 'expect:'});
        if (request.expectStatusCode) {
          lines.push({level: 5, text: `- statusCode: ${request.response.statusCode}`});
        }
        if (expectProperties.length > 0) {
          for (let expect of expectProperties) {
            if (expect.type === 'has') {
              lines.push({level: 5, text: `- hasProperty: "${expect.key}"`});
            } else if (expect.type === 'exact') {
              lines.push({level: 5, text: `- equals:`});
              lines.push({level: 6, text: `- "{{ response.${expect.key} }}"`});
              lines.push({level: 6, text: `- ${expect.expectedValue}`});
            } else if (expect.type === 'captured') {
              lines.push({level: 5, text: `- equals:`});
              lines.push({level: 6, text: `- "{{ response.${expect.key} }}"`});
              lines.push({level: 6, text: `- ${expect.capturedValue}`});
            }
          }
        }
      }
    }
    for (let line of lines) {
      let newLine = '';
      for (let index = 0; index < line.level; index++) {
        newLine += '&nbsp;&nbsp;';
      }
      newLine += line.text;
      this.artillery += newLine + '\n';
    }
  }
}

@inject(RequestRecorder)
export class HighlightValueConverter {

  constructor(private recorder: RequestRecorder) {}

  public toView(text: string) {
    if (text.indexOf('capture') === -1) return text;    
    for (let varName in this.recorder.idByVar) {
      const val = this.recorder.idByVar[varName];
      const regex = new RegExp(`{{\\s${varName}\\s}}`, 'gm');
      const replace = `<span title="${val}" class="request-recorder-viewer__highlight">{{ ${varName} }}</span>`;
      text = text.replace(regex, replace);
    }
    return text;
  }

}