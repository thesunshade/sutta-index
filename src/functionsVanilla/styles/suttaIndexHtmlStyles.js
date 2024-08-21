export const suttaIndexHtmlStyles = `
<style>

@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Extra+Condensed:wght@400;500&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,400;0,500;1,400&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap');

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
  font-family: "Fira Sans";
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

p {
  margin: 0;
  font-family: "Fira Sans";
}

a {
  text-decoration: none;
  white-space: nowrap;
  word-spacing: -3px;
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
  font-family: "Fira Code";
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

/*.search-results {
  overflow-y: auto;
  overflow-x: hidden;
}*/

.link-list, .search-results {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 50vh;
  background-color: var(--offwhite);
  margin: 0 0 1rem 0;
  max-width: var(--max-width);
  overscroll-behavior: contain;
  padding: 10px;
}

.search-results:empty {
  display: none;
}

.link-list a:hover {
  background-color: var(--primary);
  color: black;
}


.link-list div {
  list-style: none;
  text-indent: -1rem;
}


.menu-item {
  padding-left: 1rem;
  text-indent: -1rem;
  display: block;
  cursor: pointer;
}

.menu-item:hover {
  background-color: var(--primary);
  color: black;
}

.link-list div {
  padding-left: 1rem;
  display: block
}

.separator {
    border-top: 1px solid #ddd;
    margin: 0.5rem 0;
}

.alphabet-anchor {
  font-size: 1.6rem;
  border-bottom: solid #3f3f3f 2px;
  margin-top: 1rem;
  margin-left: 1rem;
  color: #3f3f3f;
  padding-bottom: .5rem;
  font-weight: 500;
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
}

.dark .head-word-area {
  background-color: var(--offblack);
}

.head-word {
  font-weight: 500;
  display: flex;
  align-items: center;
}

.counter {
  align-self: flex-start; 
  font-size: .83em;
  color: gray;
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

a.xref-link {
  white-space: inherit;
  word-spacing: inherit;
}

.xref-link {
  color: #007b00;
  font-style: italic;
}

.xref-link:visited {
  color: #007b00
}

.dark .xref-link {
  color: #00af00
}

.dark .xref-link:visited {
  color: #00af00
}

.locator {
text-decoration: none
}

.colored-locators .locator {
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

@media only screen and (max-width: 475px) {
  .alphabet {
    max-width: 100% !important;
  }
}

@media only screen and (max-width: 475px) {
  body {
    font-family: "Fira Sans Extra Condensed";
  }

  .sutta-index {
    line-height: 130%;
    margin: 6rem 1rem;
  }

  input {
    max-width: 9rem;
  }

  .head-word-area {
    top: 5.2rem;
  }

  .sub-word {
    padding-left: var(--mobile-indent);
    text-indent: initial;
  }

}

@media only screen and (max-width: 475px) {

  .alphabet {
    margin-top: .75rem;
    margin-bottom: .75rem;
  }

  .sutta-name {
    display: none;
  }
}


  </style>
`;
