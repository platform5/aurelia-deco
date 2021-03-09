import { RequestRecorder } from './../../helpers/request-recorder';
import { RequestRecorderViewer } from './request-recorder-viewer';
import { inject, bindable } from 'aurelia-framework';
import { UxModalService } from '@aurelia-ux/modal';

@inject(RequestRecorder,  UxModalService)
export class RequestRecorderTool {

  @bindable autorun: boolean = false;

  constructor(private recorder: RequestRecorder, private modalService:  UxModalService) {}

  bind() {
    if (this.autorun) {
      this.recorder.start();
    }
  }

  view() {
    this.modalService.open({viewModel: RequestRecorderViewer});
  }
}