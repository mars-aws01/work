/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

/**
 *
 * @author mm67
 */
public class InstanceManagerTest {
    
    @Before 
    public void initMocks() {
           MockitoAnnotations.initMocks(this);
    }
    
    @Mock
    protected InstanceManagerTest aMockInstance;
    
    @Test
    public void singleton_instance() throws ClassNotFoundException { 
        
        InstanceManager.registerBuilder(
                InstanceManagerTest.class, 
                ()->new InstanceManagerTest());
        
        InstanceManagerTest instance1 = InstanceManager.getInstance(InstanceManagerTest.class);
        
        InstanceManagerTest instance2 = InstanceManager.getInstance(InstanceManagerTest.class);
        
        Assert.assertNotNull(instance1);
        Assert.assertNotNull(instance2);
        
        Assert.assertEquals(instance1, instance2);       
        
    }
    
    @Test
    public void register_an_instance() throws ClassNotFoundException { 
        
        InstanceManager.registerBuilder(
                InstanceManagerTest.class, 
                ()->new InstanceManagerTest());
        
        InstanceManagerTest instance1 = InstanceManager.getInstance(InstanceManagerTest.class);
        
        InstanceManager.register(
                InstanceManagerTest.class,
                new InstanceManagerTest());
        
        InstanceManagerTest instance2 = InstanceManager.getInstance(InstanceManagerTest.class);
        
        Assert.assertNotNull(instance1);
        Assert.assertNotNull(instance2);
        
        Assert.assertNotEquals(instance1, instance2);       
        
    }
    
    @Test
    public void register_a_mocked_instance() throws ClassNotFoundException { 
        
        InstanceManager.registerBuilder(
                InstanceManagerTest.class, 
                ()->new InstanceManagerTest());
        
        InstanceManagerTest instance1 = InstanceManager.getInstance(InstanceManagerTest.class);
        
        InstanceManager.register(
                InstanceManagerTest.class,
                this.aMockInstance);
        
        InstanceManagerTest instance2 = InstanceManager.getInstance(InstanceManagerTest.class);
        
        Assert.assertNotNull(instance1);
        Assert.assertNotNull(instance2);
        
        Assert.assertNotEquals(instance1, instance2);       
        
    }
}
