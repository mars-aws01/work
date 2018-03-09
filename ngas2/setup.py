# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

with open('LICENSE') as f:
    license = f.read()

setup(
    name='ngas2',
    version='1.0.0',
    description='Newegg AS2 Server',
    long_description='Newegg AS2 Repository',
    test_suite='nose.collector',
    author='Terry Ren',
    author_email='Terry.Y.Ren@newegg.com',
    url='http://trgit2/edi-eaas/ngas2',
    license=license,
    packages=find_packages(exclude=('tests', 'docs'))
)