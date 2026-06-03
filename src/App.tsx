/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import Disco from './pages/Disco';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Disclaimer from './pages/Disclaimer';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/disclaimer" component={Disclaimer} />
      <Route path="/terms-and-conditions" component={Terms} />
      <Route path="/:disco" component={Disco} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
