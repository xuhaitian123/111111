_jsload2&&_jsload2('clayer', 'x.extend(mb.prototype,{Yk:{},Dj:[],Fu:"",dq:"",vG:"",Zk:p,Gg:p,Fg:p,Eg:[],uG:0,bz:s(),Yy:s(),yu:s(),Qd:function(){this.DG()},ra:function(a,b){Hc.prototype.ra.call(this,a,b);this.Yk={};this.Dj=[];this.C=a;this.DG()},mt:ca(o),remove:function(){Hc.prototype.remove.call(this);this.GT()},DG:function(){var a=this,b=a.C;b&&(this.bz=function(b){a.$S(b)},this.Yy=function(b){a.AS(b)},this.yu=function(b){a.zS(b)},b.addEventListener("mousemove",this.bz),b.addEventListener("onhotspotover",this.Yy),b.addEventListener("onhotspotout", this.yu),b.addEventListener("onzoomstart",this.yu))},GT:function(){var a=this.C;a&&(a.removeEventListener("mousemove",this.bz),a.removeEventListener("onhotspotover",this.Yy),a.removeEventListener("onhotspotout",this.yu))},$S:function(a){var b=this,c=b.C,d=c.pa();if(c.fa()<this.gc||c.Vb())b.kB();else if(a=d.ap().lh(a.point),d=d.k.Pb,a=new Q(Math.floor(a.x*Math.pow(2,c.fa()-18)),Math.floor(a.y*Math.pow(2,c.fa()-18))),d=new Q(Math.floor(a.x/d),Math.floor(a.y/d)),this.dq=c=d.x+"_"+d.y+"_"+c.fa(),this.Yk[c]){if(this.Fu!= c){b.kB();b.CG(this.Yk[c]);this.Fu=c;for(var d=-1,a=0,e=this.Dj.length;a<e;a++)if(c==this.Dj[a]){d=a;break}0<=d&&(this.Dj.splice(d,d),this.Dj.push(c))}}else if(this.vG!=c){this.vG=c;d=Sc[parseInt(Math.random()*Sc.length)];a=b.pc;c=d+"/data?grids="+c+"&q="+a.Vm+"&tags="+a.gu+"&filter="+a.filter+"&sortby="+a.Gy+"&ak="+a.Sl+"&page_size="+a.tN+"&age="+a.tw;b.Af?c+="&geotable_id="+b.Af:b.Nn&&(c+="&databox_id="+b.Nn);var f=(1E5*Math.random()).toFixed(0);!z._rd&&(z._rd={});z._rd["_cbk"+f]=function(a){b.sS(a); delete z._rd["_cbk"+f]};pa(c+("&callback=BMap._rd._cbk"+f))}},sS:function(a){var b=this.C,c=a.content;if(!(a.status!=this.uG||!c||1>c.length)){for(var a=[],d=c[0].data,b=b.pa().ap(),e=0,f=d.length;e<f;e++){var g=d[e][2].replace(mb.UT,"").split(","),g=b.oh(new H(g[0],g[1]));a.push({pt:g,userdata:{name:d[e][0]||"name",size:d[e][4]?d[e][4].split("|"):[10,13],uid:d[e][1]||"",bO:d[e][3]||"sid1"}})}c=c[0].grid.join("_");this.Yk[c]=a;this.Dj.push(c);30<this.Dj.length&&(c=this.Dj.shift(),delete this.Yk[c], delete c);this.Fu!=this.dq&&(this.kB(),this.Yk[this.dq]&&(this.CG(this.Yk[this.dq]),this.Fu=this.dq))}},CG:function(a){for(var b=this.C,c=0,d=a.length;c<d;c++){var e=a[c].userdata.size,f=e[0]/2,e=e[1]/2,f=new hb(a[c].pt,{offsets:[e,f,e,f],userData:a[c].userdata});b.ow(f,this.pc.Ak)}},kB:function(){this.C.am(this.pc.Ak)},AS:function(a){if(a.spots&&!(1>a.spots.length||a.spots[0].tag!=this.pc.Ak)){this.Eg=a.spots;var b=this,a=this.Eg[0].getUserData().size[0],c="",d=b.C,e="",f=b.pc.vY;0<this.Eg.length&& (c=this.Eg[0].getUserData().name);if(this.Gg)this.Gg.ta(this.Eg[0].ha()),this.Fg.ad(c),this.Fg.Ve(new N(a,0)),this.Gg.show(),c?this.Fg.show():this.Fg.U();else{var g=this.Eg[0].getUserData().size,e=this.Eg[0].getUserData().bO,i=this.Af||this.Nn;this.Zk=new qc(E.qa+"blank.gif",new N(g[0],g[1]),{anchor:new N(g[0]/2+1,g[1]/2+1)});this.iS(i,e,function(){b.Gg&&b.Gg.Ub(b.Zk)});this.Gg=new T(this.Eg[0].ha(),{font:this.Zk,enableMassClear:q});d.Ja(this.Gg);this.Fg=new uc(c,{offset:new N(a,0)});this.Fg.Ld({backgroundColor:f.backgroundColor, borderColor:f.borderColor});this.Gg.an(this.Fg);c?this.Fg.show():this.Fg.U();this.Gg.addEventListener("onclick",function(){if(!(b.Eg.length<1)&&b.Eg[0].getUserData().uid){var a=b.pc,c=a.VX;if(b.Af)c=a.WX;a=c+b.Eg[0].getUserData().uid+"?scope=2&ak="+a.Sl;b.Af&&(a=a+("&geotable_id="+b.Af));var d=(Math.random()*1E5).toFixed(0);!z._rd&&(z._rd={});z._rd["_cbk"+d]=function(a){b.hS(a);delete z._rd["_cbk"+d]};pa(a+("&callback=BMap._rd._cbk"+d))}})}}},hS:function(a){var b=a.content;this.Af&&(b=a.contents[0]); if(a&&a.status==this.uG&&b){var a={poiId:b.uid||"",databoxId:b.databox_id||"",title:this.Af?b.title:b.name,address:this.Af?b.address:b.addr,phoneNumber:b.tel||"",postcode:b.zip||"",provinceCode:1*b.province_id||-1,province:b.province||"",cityCode:1*b.city_id||-1,city:b.city||"",districtCode:1*b.district_id||-1,district:b.district||"",point:this.Af?new H(b.location[0],b.location[1]):new H(b.longitude,b.latitude),tags:b.tag&&b.tag.replace(mb.XT,"").split(mb.VT),typeId:1*b.cla||-1,extendedData:b.ext|| {}},c=new x.lang.Xy("onhotspotclick");c.customPoi=a;c.content=b;this.dispatchEvent(c)}},zS:function(){this.Gg&&this.Gg.U();this.Fg&&this.Fg.U()},iS:function(a,b,c){var d=this,e=Tc+"?method=getstyle&databox="+a+"&sid="+b,f=(1E5*Math.random()).toFixed(0);if(!d.Zk||!(d.Zk.databoxid==a&&d.Zk.sid==b))!z._rd&&(z._rd={}),z._rd["_cbk"+f]=function(a){var b="";0==a.status&&(b="data:image/png;base64,"+a.content.sid1);0<b.length&&(d.Zk.PN(b),c&&c(a));delete z._rd["_cbk"+f]},pa(e+("&callback=BMap._rd._cbk"+f))}}); ');
