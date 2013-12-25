# -*- coding: utf-8 -*-
from django import forms

class LoginForm(forms.Form):
    account = forms.CharField(max_length=100)
    password = forms.CharField(max_length=100)
    remember = forms.BooleanField(required=False)
    next =  forms.CharField(max_length=100)

class RegisterForm(forms.Form):
    account = forms.CharField(max_length=100)
    password = forms.CharField(max_length=100)
    repeat_password = forms.CharField(max_length=100)
    remember = forms.BooleanField(required=False)

    def clean(self):
        cleaned_data = super(RegisterForm, self).clean()
        password1 = cleaned_data.get("password")
        password2 = cleaned_data.get("repeat_password")

        if password1 == None or password2 == None or password1 != password2:
            #self.add_error('password', '密码不一致')
            raise forms.ValidationError('密码不一致')
        return cleaned_data