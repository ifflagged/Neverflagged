/***

Thanks to & modified from 
1. https://gist.githubusercontent.com/Hyseen/b06e911a41036ebc36acf04ddebe7b9a/raw/nf_check.js
2. https://raw.githubusercontent.com/Tartarus2014/Script/master/stream-ui-check.js
For Loon 344+ ONLY!!

[script]

generic script-path= https://github.com/ifflagged/Neverflagged/raw/main/Loon/Script/UnlockCheck.js, tag=Unlock Check, img-url=checkmark.seal.system, enabled=true

@XIAO_KOP

**/

const BASE_URL = 'https://www.netflix.com/title/';
const BASE_URL_YTB = "https://www.youtube.com/premium";
const BASE_URL_DISNEY = 'https://www.disneyplus.com';
const FILM_ID = 81215567

const link = { "media-url": "https://raw.githubusercontent.com/KOP-XIAO/QuantumultX/master/img/southpark/7.png" } 
const policy_name = "Netflix" //填入你的 netflix 策略组名

const arrow = " ➟ "

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'

// 即将登陆
const STATUS_COMING = 2
// 支持解锁
const STATUS_AVAILABLE = 1
// 不支持解锁
const STATUS_NOT_AVAILABLE = 0
// 检测超时
const STATUS_TIMEOUT = -1
// 检测异常
const STATUS_ERROR = -2

var inputParams = $environment.params;
var nodeName = inputParams.node;

var opts = {
    node: nodeName,
};

var opts1 = {
  node: nodeName,
  redirection: false
};


var flags = new Map([[ "AC" , "🇦🇨" ] ,["AE","🇦🇪"], [ "AF" , "🇦🇫" ] , [ "AI" , "🇦🇮" ] , [ "AL" , "🇦🇱" ] , [ "AM" , "🇦🇲" ] , [ "AQ" , "🇦🇶" ] , [ "AR" , "🇦🇷" ] , [ "AS" , "🇦🇸" ] , [ "AT" , "🇦🇹" ] , [ "AU" , "🇦🇺" ] , [ "AW" , "🇦🇼" ] , [ "AX" , "🇦🇽" ] , [ "AZ" , "🇦🇿" ] , ["BA", "🇧🇦"], [ "BB" , "🇧🇧" ] , [ "BD" , "🇧🇩" ] , [ "BE" , "🇧🇪" ] , [ "BF" , "🇧🇫" ] , [ "BG" , "🇧🇬" ] , [ "BH" , "🇧🇭" ] , [ "BI" , "🇧🇮" ] , [ "BJ" , "🇧🇯" ] , [ "BM" , "🇧🇲" ] , [ "BN" , "🇧🇳" ] , [ "BO" , "🇧🇴" ] , [ "BR" , "🇧🇷" ] , [ "BS" , "🇧🇸" ] , [ "BT" , "🇧🇹" ] , [ "BV" , "🇧🇻" ] , [ "BW" , "🇧🇼" ] , [ "BY" , "🇧🇾" ] , [ "BZ" , "🇧🇿" ] , [ "CA" , "🇨🇦" ] , [ "CF" , "🇨🇫" ] , [ "CH" , "🇨🇭" ] , [ "CK" , "🇨🇰" ] , [ "CL" , "🇨🇱" ] , [ "CM" , "🇨🇲" ] , [ "CN" , "🇨🇳" ] , [ "CO" , "🇨🇴" ] , [ "CP" , "🇨🇵" ] , [ "CR" , "🇨🇷" ] , [ "CU" , "🇨🇺" ] , [ "CV" , "🇨🇻" ] , [ "CW" , "🇨🇼" ] , [ "CX" , "🇨🇽" ] , [ "CY" , "🇨🇾" ] , [ "CZ" , "🇨🇿" ] , [ "DE" , "🇩🇪" ] , [ "DG" , "🇩🇬" ] , [ "DJ" , "🇩🇯" ] , [ "DK" , "🇩🇰" ] , [ "DM" , "🇩🇲" ] , [ "DO" , "🇩🇴" ] , [ "DZ" , "🇩🇿" ] , [ "EA" , "🇪🇦" ] , [ "EC" , "🇪🇨" ] , [ "EE" , "🇪🇪" ] , [ "EG" , "🇪🇬" ] , [ "EH" , "🇪🇭" ] , [ "ER" , "🇪🇷" ] , [ "ES" , "🇪🇸" ] , [ "ET" , "🇪🇹" ] , [ "EU" , "🇪🇺" ] , [ "FI" , "🇫🇮" ] , [ "FJ" , "🇫🇯" ] , [ "FK" , "🇫🇰" ] , [ "FM" , "🇫🇲" ] , [ "FO" , "🇫�" ] , [ "FR" , "🇫🇷" ] , [ "GA" , "🇬🇦" ] , [ "GB" , "🇬🇧" ] , [ "HK" , "🇭🇰" ] ,["HU","🇭🇺"], [ "ID" , "🇮🇩" ] , [ "IE" , "🇮🇪" ] , [ "IL" , "🇮🇱" ] , [ "IM" , "🇮🇲" ] , [ "IN" , "🇮🇳" ] , [ "IS" , "🇮🇸" ] , [ "IT" , "🇮🇹" ] , [ "JP" , "🇯🇵" ] , [ "KR" , "🇰🇷" ] , [ "LU" , "🇱🇺" ] , [ "MO" , "🇲🇴" ] , [ "MX" , "🇲🇽" ] , [ "MY" , "🇲🇾" ] , [ "NL" , "🇳🇱" ] , [ "PH" , "🇵🇭" ] , [ "RO" , "🇷🇴" ] , [ "RS" , "🇷🇸" ] , [ "RU" , "🇷🇺" ] , [ "RW" , "🇷🇼" ] , [ "SA" , "🇸🇦" ] , [ "SB" , "��🇧" ] , [ "SC" , "🇸🇨" ] , [ "SD" , "🇸🇩" ] , [ "SE" , "🇸🇪" ] , [ "SG" , "🇸🇬" ] , [ "TH" , "🇹🇭" ] , [ "TN" , "🇹🇳" ] , [ "TO" , "🇹🇴" ] , [ "TR" , "🇹🇷" ] , [ "TV" , "🇹🇻" ] , [ "TW" , "🇨🇳" ] , [ "UK" , "🇬🇧" ] , [ "UM" , "🇺🇲" ] , [ "US" , "🇺🇸" ] , [ "UY" , "🇺🇾" ] , [ "UZ" , "🇺🇿" ] , [ "VA" , "🇻🇦" ] , [ "VE" , "🇻🇪" ] , [ "VG" , "🇻🇬" ] , [ "VI" , "🇻🇮" ] , [ "VN" , "🇻🇳" ] , [ "ZA" , "🇿🇦"]])

let result = {
  "title": 'Unlock Check',
  "YouTube": '<b>YouTube: </b> Check Failed',
  "Netflix": '<b>Netflix: </b> Check Failed',
  "Discovery" : "<b>Discoveryᐩ: </b> Check Failed",
  //"Google": "Google Location: Check Failed"

}
// const message = {
//   action: "get_policy_state",
//   content: $environment.params
// };

;(async () => {
  testYTB()
  let [{ region, status }] = await Promise.all([testDisneyPlus(),testNf(FILM_ID)])
  console.log(result["Netflix"])
  console.log(`testDisneyPlus: region=${region}, status=${status}`)
  if (status==STATUS_COMING) {
    //console.log(1)
    result["Disney"] = "<b>Disneyᐩ:</b> Coming Soon in "+flags.get(region.toUpperCase())
  } else if (status==STATUS_AVAILABLE){
    //console.log(2)
    result["Disney"] = "<b>Disneyᐩ:</b> Available in "+flags.get(region.toUpperCase())
    console.log(result["Disney"])
  } else if (status==STATUS_NOT_AVAILABLE) {
    //console.log(3)
    result["Disney"] = "<b>Disneyᐩ:</b> Unavailable"
  } else if (status==STATUS_TIMEOUT) {
    result["Disney"] = "<b>Disneyᐩ:</b> Check Failed"
  }

  let content = "-----------------------------------</br>"+([result["Netflix"],result["Disney"],result["YouTube"]]).join("</br></br>")
  content = content + "</br>-----------------------------------</br>"+"<font color=#CD5C5C>"+"<b>Current node: " + nodeName+ "</font>"
  content =`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">` + content +`</p>`
    // $notify(typeof(output),output)
  // console.log("done---------------------");
  console.log(content);
  $done({"title":result["title"],"htmlMessage":content})

})()
.finally(() => {
    $done({"title":result["title"],"htmlMessage":`<p style="text-align: center; font-family: -apple-system; font-size: large; font-weight: thin">`+'----------------------</br></br>'+"Check Failed"+'</br></br>----------------------</br>'+ nodeName + `</p>`})
});


async function testDisneyPlus() {
  try {
    let { region, cnbl } = await Promise.race([testHomePage(), timeout(7000)])
    console.log(`homepage: region=${region}, cnbl=${cnbl}`)
    // 即将登陆
//  if (cnbl == 2) {
//    return { region, status: STATUS_COMING }
//  }
    let { countryCode, inSupportedLocation } = await Promise.race([getLocationInfo(), timeout(7000)])
    console.log(`getLocationInfo: countryCode=${countryCode}, inSupportedLocation=${inSupportedLocation}`)
    
    region = countryCode ?? region
    console.log( "region:"+region)
    // 即将登陆
    if (inSupportedLocation === false || inSupportedLocation === 'false') {
      return { region, status: STATUS_COMING }
    } else {
      // 支持解锁
      return { region, status: STATUS_AVAILABLE }
    }
    
  } catch (error) {
    console.log("error:"+error)
    
    // 不支持解锁
    if (error === 'Not Available') {
      console.log("不支持")
      return { status: STATUS_NOT_AVAILABLE }
    }
    
    // 检测超时
    if (error === 'Timeout') {
      return { status: STATUS_TIMEOUT }
    }
    
    return { status: STATUS_ERROR }
  } 
  
}

function getLocationInfo() {
  return new Promise((resolve, reject) => {
    let opts0 = {
      url: 'https://disney.api.edge.bamgrid.com/graph/v1/device/graphql',
      node: nodeName,
      headers: {
        'Accept-Language': 'en',
        "Authorization": 'ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',
        'Content-Type': 'application/json',
        'User-Agent': UA,
      },
      body: JSON.stringify({
        query: 'mutation registerDevice($input: RegisterDeviceInput!) { registerDevice(registerDevice: $input) { grant { grantType assertion } } }',
        variables: {
          input: {
            applicationRuntime: 'chrome',
            attributes: {
              browserName: 'chrome',
              browserVersion: '94.0.4606',
              manufacturer: 'microsoft',
              model: null,
              operatingSystem: 'windows',
              operatingSystemVersion: '10.0',
              osDeviceIds: [],
            },
            deviceFamily: 'browser',
            deviceLanguage: 'en',
            deviceProfile: 'windows',
          },
        },
      }),
    }

    $httpClient.post(opts0, (error, response, data) => {
        if (error) {
            reject(error)
            return
        }
        if (response.status !== 200) {
            console.log('getLocationInfo: ' + data)
            reject('Not Available')
        } else {
            let {
                inSupportedLocation,
                location: { countryCode },
              } = JSON.parse(data)?.extensions?.sdk?.session
            resolve({ inSupportedLocation, countryCode })
        }
    });
  })
}

function testHomePage() {
  return new Promise((resolve, reject) => {
    let opts0 = {
      url: 'https://www.disneyplus.com/',
      node: nodeName,
      headers: {
        'Accept-Language': 'en',
        'User-Agent': UA,
      },
    }
    $httpClient.get(opts0, (error, response, data) => {
        if (error) {
            reject(error)
            return
        }
        if (response.status !== 200 || data.indexOf('unavailable') !== -1) {
            reject('Not Available')
            return
        } else {
            let match = data.match(/Region: ([A-Za-z]{2})[\s\S]*?CNBL: ([12])/)
            if (!match) {
            resolve({ region: '', cnbl: '' })
            return
            } else {
            let region = match[1]
            let cnbl = match[2]
            //console.log("homepage"+region+cnbl)
            resolve({ region, cnbl })
            }
        }
    });
  })
}

function timeout(delay = 5000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Timeout')
    }, delay)
  })
}

function testNf(filmId) {
  return new Promise((resolve, reject) =>{
    let option = {
      url: BASE_URL + filmId,
      node: nodeName,
      timeout: 3200,
      headers: {
        'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
      },
    }

    $httpClient.get(option, (error, response, data) => {
        if (error) {
            result["Netflix"] = "<b>Netflix: </b> Check Failed"
            console.log(result["Netflix"])
            resolve("timeout")
            return
        }

        console.log("nf:"+response.status)
        if (response.status === 404) {
            result["Netflix"] = "<b>Netflix: </b> Original Netflix"
            console.log("nf:"+result["Netflix"])
            resolve('Not Found')
            return 
        } else if (response.status === 403) {
            //console.log("nfnf")
            result["Netflix"] = "<b>Netflix: </b> Unavailable"
            console.log("nf:"+result["Netflix"])
            //$notify("nf:"+result["Netflix"])
            resolve('Not Available')
            return
        } else if (response.status === 200) {
            let url = response.headers["XOriginatingURL"]
            let region = 'sg'
            if (url != undefined) {
              region = url.split('/')[3]
              region = region.split('-')[0]
              if (region == 'title') {
                region = 'sg'
              }
            }
            console.log("nf:"+region)
            result["Netflix"] = "<b>Netflix: </b> Full Netflix in "+flags.get(region.toUpperCase())
            //$notify("nf:"+result["Netflix"])
            resolve("nf:"+result["Netflix"])
            return 
        }
    });
  }
  )
}

function testYTB() { 
    let option = {
      url: BASE_URL_YTB,
      node: nodeName,
      timeout: 2800,
      headers: {
        'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'
      },
    }

    $httpClient.get(option, (error, response, data) => {
        if (error) {
            result["YouTube"] = "<b>YouTube Premium: </b> Timeout"
            //resolve("timeout")
            return
        }
        console.log("ytb:"+response.status)
        if (response.status !== 200) {
            //reject('Error')
            result["YouTube"] = "<b>YouTube Premium: </b> Check Failed"
        } else if (data.indexOf('Premium is not available in your country') !== -1) {
            //resolve('Not Available')
            result["YouTube"] = "<b>YouTube Premium: </b> Unavailable"
        } else if (data.indexOf('Premium is not available in your country') == -1) {//console.log(data.split("countryCode")[1])
            let region = ''
            let re = new RegExp('"GL":"(.*?)"', 'gm')
            let ret = re.exec(data)
            if (ret != null && ret.length === 2) {
                region = ret[1]
            } else if (data.indexOf('www.google.cn') !== -1) {
                region = 'CN'
            } else {
                region = 'US'
            }
            //resolve(region)
            result["YouTube"] = "<b>YouTube Premium: </b> Available in "+flags.get(region.toUpperCase())
            console.log("ytb:"+region+ result["YouTube"])
        }
    });
}
