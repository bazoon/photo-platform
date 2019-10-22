import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { CurrentUserService } from '../../state/current-user.service';
import { Observable, of, Subscription } from 'rxjs';


@Directive({
  selector: "[rbacShow]"
})
export class RbacShowDirective {
  allowedRoles: string[] = [];
  roles: Observable<Array<string>> = of([])
  subscription?: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: CurrentUserService) {

  }

  @Input() rbacShow: string[] = [];

  ngOnInit() {
    this.subscription = this.authService.roles.subscribe(roles => {
      this.allowedRoles = this.rbacShow;
      if (!this.allowedRoles || this.allowedRoles.length === 0 ||
        !this.authService.isLoggedIn) {
        this.viewContainer.clear();
        return;
      }

      const allowed: boolean = roles.filter(
        role => this.allowedRoles.includes(role)).length > 0;

      if (allowed) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
      else {
        this.viewContainer.clear();
      }
    });
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

}