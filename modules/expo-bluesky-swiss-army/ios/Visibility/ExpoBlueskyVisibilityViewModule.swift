import ExpoModulesCore

public class ExpoORBISVisibilityViewModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoORBISVisibilityView")

    AsyncFunction("updateActiveViewAsync") {
      VisibilityViewManager.shared.updateActiveView()
    }

    View(VisibilityView.self) {
      Events([
        "onChangeStatus"
      ])

      Prop("enabled") { (view: VisibilityView, prop: Bool) in
        view.enabled = prop
      }
    }
  }
}
