<h1 align="center">
    <img src="https://www.smudgy.store/uploads/icon.png" style="height: 1em">
    <span>Smudgy Plugins</span>
</h1>

<h3 align="center">
    Contributing Guidelines
</h3>

---

> [!CAUTION]
> **Security Warning:** Malicious scripts (token grabbers) will result in an immediate blacklist. All scripts are reviewed.

---

<h2>Script Requirements</h2>

<h3>1. Required Header Format</h3>

<p>Every script MUST start with this exact header format at the very top:</p>

<pre><code>// ==UserScript==
// @name         {Your Script Name}
// @description  {Brief description of what your script does}
// @version      {1.0.0}
// @author       {Your Name/GitHub Username}
// @github       {https://github.com/yourusername/yourrepo}
// ==/UserScript==</code></pre>

<p><strong>Example:</strong></p>

<pre><code>// ==UserScript==
// @name         Auto Claim Daily
// @description  Automatically claims daily rewards
// @version      0.0.1
// @author       OBS-Akuma
// @github       https://github.com/OBS-Akuma/AutoClaimDaily
// ==/UserScript==

// Your script code starts here</code></pre>

<h3>2. No Console Scripts</h3>

<p>Scripts that only work in browser console will be <strong>REJECTED</strong>. Your script must work inside the Smudgy Client's script environment.</p>

<h3>3. Client Compatibility</h3>

<p>Your script must work inside the scripts file of the client:</p>

<ul>
  <li><strong>Smudgy Client</strong> (required)</li>
  <li><strong>Dawn Client</strong> (recommended)</li>
</ul>

<h3>4. Functionality Rules</h3>

<ul>
  <li>No external dependencies unless documented</li>
  <li>Must not break existing client features</li>
  <li>Must handle errors gracefully</li>
  <li>Must be self-contained</li>
</ul>

---

<h2>Submission Checklist</h2>

<p>Before submitting, verify:</p>

<ul>
  <li>[ ] Header is at the very top of the file</li>
  <li>[ ] All header fields are filled out (@name, @description, @version, @author, @github)</li>
  <li>[ ] Script is NOT a console-only script</li>
  <li>[ ] Script works in Smudgy Client</li>
  <li>[ ] Script works in Dawn Client (if possible)</li>
  <li>[ ] No malicious code (token grabbers, etc.)</li>
  <li>[ ] Code is readable</li>
</ul>

---

<h2>How to Submit</h2>

<ol>
  <li>Fork the repository</li>
  <li>Add your script to the correct folder (based on your user ID path)</li>
  <li>Update <code>scripts.json</code>:</li>
</ol>

<pre><code>{
  "name": "yourScript.js",
  "version": "1.0.0"
}</code></pre>

<ol start="4">
  <li>Open a pull request describing what your script does</li>
</ol>

---

<h2>Review Process</h2>

<ul>
  <li>Header format check</li>
  <li>Functionality test within Smudgy Client</li>
  <li>Security scan for malicious code</li>
  <li>You may be asked to make changes</li>
</ul>

---

<h2>Need Help?</h2>

<p>Open an issue on GitHub or reach out in the Smudgy Client community.</p>
