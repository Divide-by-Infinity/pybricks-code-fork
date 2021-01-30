// SPDX-License-Identifier: MIT
// Copyright (c) 2020 The Pybricks Authors

import { Ace } from 'ace-builds';
import { Reducer, combineReducers } from 'redux';
import { Action } from '../actions';
import { EditorActionType } from './actions';

const current: Reducer<Ace.EditSession | null, Action> = (state = null, action) => {
    switch (action.type) {
        case EditorActionType.Current:
            return action.editSession || null;
        default:
            return state;
    }
};

export default combineReducers({ current });
