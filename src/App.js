import { useState,useRef} from "react";
import "./App.css";
import loser from './img/loser.png'
import winner from './img/winner.png'
const random = [
 "doup",
"froe",
"frig",
"skep",
"smar",
"spad",
"rale",
"plat",
"viol",
"esox",
"culb",
"amok",
"oont",
"coif",
"yeta",
"fusc",
"mump",
"cuil",
"lanx",
"bort",
"pook",
"coir",
"aver",
"gorp",
"slue",
"kine",
"dhow",
"kiln",
"glee",
"deft",
"ibex",
"orzo",
"tutu",
"ulna",
"tael",
"winx",
"ilex",
"snog",
"acid",
"tuya",
"lynx",
"grok",
"keen",
"vuln",
"tsar",
"apse",
"onyx",
"peen",
"ammo",
"oryx",
"ankh",
"gkol",
"navy",
"adze",
"echo",
"busk",
"glom",
"welt",
"faro",
"lieu",
"bled",
"jawa",
"coda",
"bevy",
"bilk",
"daub",
"espy",
"gory",
"ooze",
"peon",
"wonk",
"minx",
"jive",
"kith",
"thug",
"jolt",
"scry",
"oust",
"boor",
"iamb",
"pith",
"skua",
"bard",
"wren",
"myna",
"curb",
"glum",
"czar",
"lamb",
"awry",
"brig",
"scat",
"pimp",
"lung",
"jape",
"lewd",
"amen",
"clef",
"knob",
"epic",
"rapt",
"yawl",
"abet",
"oxen",
"berm",
"waif",
"rasp",
"opal",
"yolk",
"gawk",
"ache",
"glut",
"spry",
"serf",
"vamp",
"twat",
"wisp",
"doff",
"ague",
"fiat",
"akin",
"faux",
"arid",
"egad",
"loin",
"acme",
"puce",
"ogle",
"okra",
"cyst",
"onus",
"ogre",
"shiv",
"lens",
"iris",
"udon",
"gnat",
"silo",
"nerd",
"quip",
"tofu",
"ping",
"élan",
"ecru",
"axis",
"ruby",
"bulk",
"dais",
"flax",
"smew",
"kyat",
"puma",
"pulp",
"puha",
"sped",
"icon",
"lava",
"oboe",
"iota",
"sofa",
"pelf",

];
var arr = random[Math.floor(Math.random() * random.length)];

export default function App() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [open,setOpen]=useState(false);
  const [list, setList] = useState([
    { inputValue: "", bull: 0, cow: 0, show: false }
  ]);

  function IsValidJSONString(str) {
    const reg = /^[a-z,\s]{4}$/;
    let uniq = "";
    let flag = false;
    let enterValue = reg.test(str);
    for (let i = 0; i < str.length; i++) {
      if (uniq.includes(str[i]) === true) {
        flag = true;
        break;
      } else {
        uniq += str[i];
      }
    }

    if (enterValue && !flag) return true;
    else {
      return false;
    }
  }

  const inputRef = useRef(null);

  const handleChange = (e) => {
    setOpen(true)
    setValue(e.target.value.toLowerCase());
    if (e.target.value === '') {
      setError('Please pass correct value');
      return;
    }
    const valid = IsValidJSONString(e.target.value.toLowerCase());

    if (valid) {
      setError("");
      setIsValid(true);
    } else {
      setIsValid(false);
      setError(`Please enter only 4 unique characters`);
    }
    
  };

  const handleSubmit = () => {
   
    setOpen(true)
    if (isValid) {
      let bCount = 0;
      let cCount = 0;
      const finedPositionFunction = (index) => {
        if (value[index] === arr[index]) {
          return true;
        } else {
          return false;
        }
      };

      const finedPositionDiffrent = (index1, index2) => {
        if (arr[index1] === value[index2]) {
          return true;
        } else {
          return false;
        }
      };

      for (let i = 0; i < arr.length; i++) {
        const finedPosition = finedPositionFunction(i);

        if (finedPosition) {
          bCount++;
        } else {
          for (let j = 0; j < arr.length; j++) {
            if (finedPositionDiffrent(i, j) && i !== j) {
              cCount++;
            }
          }
        }
      }

      const newItem = {
        inputValue: value,
        show: true,
        bull: bCount,
        cow: cCount
      };

      const newItems = [...list, newItem];

      setList(newItems);
      setValue("");
      setIsValid(false);
    }
  };
  return (
    <>
    {!open &&(
    <div className="main-container" style={{display: open ? "none":"flex"}}>    
    <div className="play-container">
      <div className="play"  onClick={()=>{setOpen(true)}}>Play</div>
      <h4>Bulls and Cows</h4>
    </div>
    
    </div>
    )}
    
    {open && (  <>
              <div className="wrap-welcome">
      <h1 className="welcome">Let's Play Cows & Bulls</h1>
              <div className="left-text">
              Left <span>{6-list.length} </span> trail
              </div>
              </div>
      <div className="App">
      <div className="input-main">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          className="input-box"
          maxLength="4"
          ref={inputRef}
          autoFocus
        />
        <button
          onClick={handleSubmit}
          className="button"
          disabled={!isValid}
        >
          Submit
          </button>
      </div>
      <div className="error">{error}</div>
      <div className="list-container">
      {
        list.length<=10 ? list.map((content, index) => (
        <>
        {
          content.bull === 4 ? <div key={`index+${index}`}><img src={winner} alt="winner" className="loser"/><p className="word">The Word Was <span style={{textDecoration: 'underline solid aliceblue'}}>{arr}</span></p></div>:
        
          <div className="row" key={index}>
            {content.show && (
              <>
                <div className="input-value">{content.inputValue}</div>
                <div className="out-value">
                  {content.bull + "B---" + content.cow + "C"}
                </div>
              </>
            )}
          </div>
        }
        </>
      )):
      <div>
        <img src={loser} alt="loser" className="loser"/>
        <p className="word">The Word Was <span style={{textDecoration: 'underline solid aliceblue'}}>{arr}</span></p>
      </div>
      }
    </div>
    </div>
    </>
    )}
    </>
  );
}
