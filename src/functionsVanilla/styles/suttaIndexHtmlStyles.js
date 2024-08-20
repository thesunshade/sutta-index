export const suttaIndexHtmlStyles = `
<style>

@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@400;700&display=swap');
*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --indent: 3.5rem;
  --mobile-indent: .5rem;
  --primary: rgb(238, 111, 32);
  --dark-primary: #6b1617;
  --offwhite: #fff9f1;
  --dark-offwhite: #d1d1d1;
  --offblack: #150d01;
  --dark-link: #729cff;
  --dark-visited: #b472ff;
  --dn: #d1eddf;
  --mn: #F5DEB3;
  --sn: #ADD8E6;
  --an: #E6E6FA;
  --kp: #FFD485;
  --dhp: #B7E0D2;
  --ud: #e9e296;
  --iti: #FFE4E1;
  --snp: #FAF0E6;
  --vv: #FAFAD2;
  --pv: #D3D3D3;
  --thag: #DDF0FF;
  --thig: #DCE3C7;
  accent-color: black;
}

App {
  width: 100vw;
}

body {
  font-family: "Fira Sans Extra Condensed";
  min-height: 100vh;
  line-height: 125%;
  background-color: var(--offwhite);

}

::selection {
  background-color: var(--primary);
}

body.dark {
  background-color: var(--offblack);
  color: var(--dark-offwhite);
}

html {
  scroll-padding-top: 5rem;
  scroll-behavior: smooth;
}

* {
  box-sizing: border-box
}

.settings-bar {
  background-color: var(--primary);
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 0 10px;
  z-index: 100;
}

.top-row {
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
  padding: .5rem 0;
  min-width: 360px;
}

.settings-button img {
  display: flex;
  margin-top: 0.2rem;
  rotate: 0deg;
  transition: rotate ease-in-out 1s;
  cursor: pointer;
}

.settings-button img:active {
  rotate: 90deg;
}

.icon {
  filter: brightness(0);

}

.dark .icon {
  filter: brightness(1);
  filter: invert(100%);
}

.alphabet {
  font-family: "Fira Sans Extra Condensed";
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 35rem;
  min-width: 0;
}

.alphabet a,
.alphabet a:visited {
  color: black;
}

.alphabet span {
  border-radius: 8px 8px 0px 0px;
  padding: 4px 4px 3px 3px;
  cursor: pointer;
}

.alphabet span:hover {
  color: var(--primary);
  text-decoration: none;
  background-color: black;
}

.dark .alphabet span:hover {
  color: var(--dark-primary) !important;
  background-color: var(--offwhite);
}

.dark .alphabet a,
.dark .alphabet a:visited {
  color: var(--offwhite)
}


.dark .settings-bar {
  background-color: var(--dark-primary);
}

.alphabet-anchor {
  font-size: 1.6rem;
  border-bottom: solid #3f3f3f 2px;
  margin-top: 1rem;
  margin-left: 1rem;
  color: #3f3f3f;
  padding-bottom: .5rem;
  font-weight: bold;
  font-family: "Fira Code";

}

.dark .alphabet-anchor {
  font-size: 1.6rem;
  border-bottom: solid #bfbfbf 2px;
  color: #bfbfbf;
  margin-top: 1rem;
}

.head-word-area {
  padding-top: .7rem;
  padding-bottom: .2rem;
  position: sticky;
  top: 4.2rem;
  background-color: var(--offwhite);
  z-index:1;
}

.dark .head-word-area {
  background-color: var(--offblack);
}

.head-word {
  font-weight: bold;
  display: flex;
  align-items: center;
}

.headword-link,
.headword-link:visited {
  color: var(--offblack);
  word-spacing: inherit;
  position: relative;
  text-decoration: none !important;
  white-space: inherit;
}

.dark .headword-link,
.dark .headword-link:visited {
  color: var(--dark-offwhite)
}

.sub-word {
  padding-left: 6.5rem;
  text-indent: -2rem;
  line-height: 1.4rem;
}

.locator {
text-decoration: none
}

.colored-locators .locator {
  padding: 1.5px;
  border: solid 1px rgb(220, 220, 220);
}

.colored-locators .dn {
  background-color: var(--dn);
}

.colored-locators .mn {
  background-color: var(--mn);
}

.colored-locators .sn {
  background-color: var(--sn);
}

.colored-locators .an {
  background-color: var(--an);
}

.colored-locators .kp {
  background-color: var(--kp);
}

.colored-locators .dhp {
  background-color: var(--dhp);
}

.colored-locators .ud {
  background-color: var(--ud);
}

.colored-locators .iti {
  background-color: var(--iti);
}

.colored-locators .snp {
  background-color: var(--snp);
}

.colored-locators .vv {
  background-color: var(--vv);
}

.colored-locators .pv {
  background-color: var(--pv);
}

.colored-locators .thag {
  background-color: var(--thag);
}

.colored-locators .thig {
  background-color: var(--thig);
}

  </style>
`;
