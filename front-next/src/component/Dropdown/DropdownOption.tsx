import React from "react";

export default class dropdownOption {
    public value: string;
    public text: string;
    public selected: boolean;
    public icon?: string | undefined;
    public image?: string | undefined;

    constructor(value: string, text: string, selected: boolean, icon: string | undefined, image: string | undefined) {
        this.value = value;
        this.text = text;
        this.selected = selected ?? false;
        this.icon = icon;
        this.image = image;
    }

    static from(value: string, text: string, selected: boolean, icon?: string, image?: string) {
        return new dropdownOption(value, text, selected, icon, image);
    }
}