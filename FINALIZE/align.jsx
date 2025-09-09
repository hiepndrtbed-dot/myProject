Algn(false, false, false)
function Algn(alignToCanvas, vignette, radialDistort) {
    var c2t = function (s) {
        return app.charIDToTypeID(s)
    }

    var s2t = function (s) {
        return app.stringIDToTypeID(s)
    }

    var descriptor = new ActionDescriptor()
    var reference = new ActionReference()

    reference.putEnumerated(s2t("layer"), s2t("ordinal"), s2t("targetEnum"))
    descriptor.putReference(c2t("null"), reference)
    descriptor.putEnumerated(s2t("using"), s2t("alignDistributeSelector"), s2t("ADSContent"))
    descriptor.putBoolean(s2t("alignToCanvas"), alignToCanvas)
    descriptor.putEnumerated(s2t("apply"), s2t("projection"), s2t("auto"))
    descriptor.putBoolean(s2t("vignette"), vignette)
    descriptor.putBoolean(s2t("radialDistort"), radialDistort)
    executeAction(c2t("Algn"), descriptor, DialogModes.NO)
}