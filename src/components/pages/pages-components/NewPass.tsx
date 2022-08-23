import React from 'react';
import {NewPassForm} from "../../Forms-new-pass-form/NewPassForm";


export const NewPass = () => {
    return (
      <div className="auth-container">
        <h1>Create new password</h1>
        <NewPassForm/>
      </div>
    );
}

