var desc = new ActionDescriptor();

    // Thiết lập White Balance
    desc.putDouble(stringIDToTypeID("temperature"), 3.0); // Temperature: +3
    desc.putDouble(stringIDToTypeID("tint"), 1.0);        // Tint: +1

    // Thiết lập Vibrance và Saturation
    desc.putDouble(stringIDToTypeID("vibrance"), 0.0);    // Vibrance: 0
    desc.putDouble(stringIDToTypeID("saturation"), 0.0);  // Saturation: 0

    // Áp dụng điều chỉnh Camera Raw Filter
    executeAction(stringIDToTypeID("cameraRawFilter"), desc, DialogModes.ALL
);
