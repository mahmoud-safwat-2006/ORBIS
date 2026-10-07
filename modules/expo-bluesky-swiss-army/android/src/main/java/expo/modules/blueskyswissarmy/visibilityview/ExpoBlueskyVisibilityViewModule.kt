package expo.modules.orbisswissarmy.visibilityview

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoORBISVisibilityViewModule : Module() {
  override fun definition() =
    ModuleDefinition {
      Name("ExpoORBISVisibilityView")

      AsyncFunction("updateActiveViewAsync") {
        VisibilityViewManager.updateActiveView()
      }

      View(VisibilityView::class) {
        Events(arrayOf("onChangeStatus"))

        Prop("enabled") { view: VisibilityView, prop: Boolean ->
          view.isViewEnabled = prop
        }
      }
    }
}
