var dlg = new Window("dialog", "Action");
dlgStatictext = dlg.add("statictext", undefined, "0. Mịn nền > 1. Chuyển xám V1 |> 2. Mịn nền (History) |> H. Hair C. Copy Sill |> 5.Has |> 6. Sill Tam giác");
dlgStatictext = dlg.add("statictext", undefined, "7. Sill LV3 |> 8. Keo giày |> 9. Giảm đỏ tay. |> G: 3D |> A.Apply Image |> F.Fill White |> D: Dust");
dlgStatictext = dlg.add("statictext", undefined, "V. VPE BG |> P. Path BG |> L. Line BG. |> S. Skin");
dlgStatictext.alignment = "left";
dlgStatictext.alignment = "left";
dlgStatictext.alignment = "left";
var textContents = "9";

// add edit text
var edText = dlg.add("edittext", [0, 0, 100, 0]);
edText.text = textContents;
edText.alignment = "center";
edText.active = true;

//button group
var btnGroup = dlg.add("group");
btnGroup.orientation = "row";
btnGroup.alignment = "center";
