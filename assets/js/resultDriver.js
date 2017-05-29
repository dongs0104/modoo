/**
 * Created by dongs on 2017. 5. 28..
 */
/**
 * myModule.js: initial name (can change as you wish)
 *
 * @author: your name.
 * @description: anything that you want to tell about this module.
 */

var me = (me && (typeof me != "object" || me))? me : {};
if (!me.dongs) me.dongs = {};
if (!me.dongs.resultMap) me.dongs.resultMap = {};

(function(){
    var _name = "최종 결과물 보여주는 드라이브";
    var _version = 0.1;

    function loadMapData() {
        $("#map").googleMap({
            zoom: 13, // Initial zoom level (optional)
            coords: [36.1283608,128.330983] // Map center (optional)
        });
        timer = setInterval( function () {
            $.ajax({
                type :'get',
                url : 'https://csets.xyz/userRequests',
                dataType : 'json',
                success: drowMarker
            });},5000);
    }
    function drowMarker(res) {
        var Markers = [];
        var html ="";
        $.each(res, function(index, userRequest){
            var tempMarker = [userRequest.start_point[1], userRequest.start_point[0]];
            Markers.push(tempMarker);
            html += '<li><span id=\"'+ userRequest.user_id +'\">' + userRequest.user_id + ", " + tempMarker + ", " + userRequest.end_point + ' </span></li>';
        });
        $('#result').html(html);
        $.each(Markers, function(index, Marker){
            $("#map").addMarker({
                coords: Marker
            });
        });
    }

    var ns = me.dongs.resultMap;
        ns.loadMapData = loadMapData;

})();
