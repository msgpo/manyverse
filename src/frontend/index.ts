/* Copyright (C) 2018-2020 The Manyverse Authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

export enum Screens {
  Welcome = 'Manyverse.Welcome',
  Central = 'Manyverse.Central',
  Drawer = 'Manyverse.Drawer',
  DialogAbout = 'Manyverse.Dialog.About',
  DialogThanks = 'Manyverse.Dialog.Thanks',
  Compose = 'Manyverse.Compose',
  Thread = 'Manyverse.Thread',
  Conversation = 'Manyverse.Conversation',
  RecipientsInput = 'Manyverse.RecipientsInput',
  Libraries = 'Manyverse.Libraries',
  InvitePaste = 'Manyverse.Invite.Paste',
  InviteCreate = 'Manyverse.Invite.Create',
  Profile = 'Manyverse.Profile',
  ProfileEdit = 'Manyverse.Profile.Edit',
  Biography = 'Manyverse.Biography',
  Accounts = 'Manyverse.Accounts',
  Backup = 'Manyverse.Backup',
  SecretOutput = 'Manyverse.SecretOutput',
  SecretInput = 'Manyverse.SecretInput',
  RawDatabase = 'Manyverse.RawDatabase',
  RawMessage = 'Manyverse.RawMessage',
  Settings = 'Manyverse.Settings',
}

import {withState} from '@cycle/state';
import {makeKeyboardDriver} from 'cycle-native-keyboard';
import {alertDriver} from 'cycle-native-alert';
import {makeClipboardDriver} from 'cycle-native-clipboard';
import {linkingDriver} from 'cycle-native-linking';
import {makeToastDriver} from './drivers/toast';
import {asyncStorageDriver} from 'cycle-native-asyncstorage';
import {notificationDriver} from 'cycle-native-android-local-notification';
import {ssbDriver} from './drivers/ssb';
import {shareDriver} from 'cycle-native-share';
import {makeNetworkDriver} from './drivers/network';
import {makeEventBusDriver} from './drivers/eventbus';
import {dialogDriver} from './drivers/dialogs';
import {makeActivityLifecycleDriver} from './drivers/lifecycle';
import {makeExitDriver} from './drivers/exit';
import {makeOrientationDriver} from './drivers/orientation';
import {makeSplashScreenDriver} from './drivers/splashscreen';
import {welcome, navOptions as welcomeNavOpts} from './screens/welcome/index';
import {central, navOptions as centralNavOpts} from './screens/central/index';
import {drawer} from './screens/drawer/index';
import {dialogAbout} from './screens/dialog-about/index';
import {dialogThanks} from './screens/dialog-thanks/index';
import {compose} from './screens/compose/index';
import {thread} from './screens/thread/index';
import {conversation} from './screens/conversation/index';
import {recipientsInput} from './screens/recipients-input';
import {libraries} from './screens/libraries/index';
import {pasteInvite} from './screens/invite-paste/index';
import {profile} from './screens/profile/index';
import {editProfile} from './screens/profile-edit/index';
import {createInvite} from './screens/invite-create';
import {biography} from './screens/biography/index';
import {accounts} from './screens/accounts/index';
import {rawDatabase} from './screens/raw-db/index';
import {rawMessage} from './screens/raw-msg/index';
import {backup} from './screens/backup/index';
import {secretOutput} from './screens/secret-output/index';
import {secretInput} from './screens/secret-input/index';
import {settings} from './screens/settings/index';
import {Palette} from './global-styles/palette';
import {Typography} from './global-styles/typography';
import {Options, Layout} from 'react-native-navigation';

export const screens: {[k in Screens]?: (so: any) => any} = {
  [Screens.Welcome]: withState(welcome),
  [Screens.Central]: withState(central),
  [Screens.Drawer]: withState(drawer),
  [Screens.DialogAbout]: dialogAbout,
  [Screens.DialogThanks]: dialogThanks,
  [Screens.Compose]: withState(compose),
  [Screens.Thread]: withState(thread),
  [Screens.Conversation]: withState(conversation),
  [Screens.RecipientsInput]: withState(recipientsInput),
  [Screens.Libraries]: libraries,
  [Screens.InvitePaste]: withState(pasteInvite),
  [Screens.InviteCreate]: withState(createInvite),
  [Screens.Profile]: withState(profile),
  [Screens.ProfileEdit]: withState(editProfile),
  [Screens.Biography]: withState(biography),
  [Screens.Accounts]: withState(accounts),
  [Screens.Backup]: withState(backup),
  [Screens.SecretOutput]: withState(secretOutput),
  [Screens.SecretInput]: withState(secretInput),
  [Screens.RawDatabase]: rawDatabase,
  [Screens.RawMessage]: rawMessage,
  [Screens.Settings]: withState(settings),
};

export const drivers = {
  alert: alertDriver,
  asyncstorage: asyncStorageDriver,
  keyboard: makeKeyboardDriver(),
  clipboard: makeClipboardDriver(),
  linking: linkingDriver,
  globalEventBus: makeEventBusDriver(),
  ssb: ssbDriver,
  share: shareDriver,
  lifecycle: makeActivityLifecycleDriver(),
  network: makeNetworkDriver(),
  notification: notificationDriver,
  dialog: dialogDriver,
  toast: makeToastDriver(),
  orientation: makeOrientationDriver(),
  splashscreen: makeSplashScreenDriver(),
  exit: makeExitDriver(),
};

export const welcomeLayout: Layout = {
  stack: {
    id: 'mainstack',
    children: [
      {
        component: {
          name: Screens.Welcome,
          options: welcomeNavOpts,
        },
      },
    ],
  },
};

export const centralLayout: Layout = {
  sideMenu: {
    left: {
      component: {name: Screens.Drawer},
    },
    center: {
      stack: {
        id: 'mainstack',
        children: [
          {
            component: {
              name: Screens.Central,
              options: centralNavOpts,
            },
          },
        ],
      },
    },
  },
};

export const defaultNavOptions: Options = {
  statusBar: {
    visible: true,
    backgroundColor: Palette.backgroundBrandStrong,
    style: 'light',
  },
  sideMenu: {
    left: {
      shouldStretchDrawer: false,
    },
  },
  layout: {
    backgroundColor: Palette.backgroundVoid,
    orientation: ['portrait', 'landscape'],
  },
  topBar: {
    visible: false,
    drawBehind: true,
    hideOnScroll: false,
    animate: false,
    height: 0,
    borderHeight: 0,
    elevation: 0,
    leftButtonColor: Palette.textForBackgroundBrand,
    background: {
      color: Palette.backgroundBrand,
    },
    title: {
      text: '',
      color: Palette.textForBackgroundBrand,
      fontSize: Typography.fontSizeLarge,
    },
  },
};
