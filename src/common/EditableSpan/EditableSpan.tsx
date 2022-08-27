import React, {useState} from 'react';
import s from "../../components/Profile/Profile.module.css";
import {Button, FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import {changeUserNameTC} from "../../reducers/profile-reducer";
import {useDispatch} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "../../store/store";
import {AnyAction} from "redux";

type EditableSpanPropsType = {
    name: string

}

export const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(props.name);

    const dispatch = useDispatch<ThunkDispatch<AppRootStateType, void, AnyAction>>()

    const activateEditMode = () => {
        setEditMode(true);
        setNewName(props.name);
    }

    const saveNewName = (): void => {
        dispatch(changeUserNameTC(newName));
        setEditMode(false);
    };

    return (
        <div>
            {!editMode ? (
                <span onDoubleClick={activateEditMode} className={s.name}> {props.name} ✎</span>
            ) : (
                <FormControl variant="standard">
                    <InputLabel>Nickname</InputLabel>
                    <Input
                        defaultValue={newName}
                        onChange={e => setNewName(e.currentTarget.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <Button
                                    variant="contained"
                                    className={s.saveButton}
                                    onClick={saveNewName}
                                >
                                    save
                                </Button>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            )
            }
        </div>

    )
};



