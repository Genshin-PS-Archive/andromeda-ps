import System;
import System.Windows.Forms;
import Fiddler;
import System.Text.RegularExpressions;

class Handlers
{
    static function OnBeforeRequest(oS: Session) {
        if(oS.uriContains("http://overseauspider.yuanshen.com:8888/log")
            || oS.uriContains("http://uspider.yuanshen.com:8888/log")){
            oS.oRequest.FailSession(404, "Blocked", "yourmom");
        }
        if(oS.host.EndsWith(".yuanshen.com:12401") || oS.host.EndsWith(".yuanshen.com") || oS.host.EndsWith(".hoyoverse.com") || oS.host.EndsWith(".mihoyo.com")) {
            oS.fullUrl = oS.fullUrl.Replace("https://", "http://");
            oS.host = "localhost:3333";
        }
    }
};
