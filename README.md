# smartnode_ansible
Ansible Playbooks for Managing Large Smartnode Clusters

What is Ansible?
    Ansible is an opensource automation system. It allows you to write "playbooks", or sets of commands, and execute those playbooks          across a large set of remote hosts, Smartcash Smartnodes in our case.

How can it help me?
    If you are like me and thought that the "early bird gets the worm", then you more than likely didnt use the new bash installer, and     therefore, you have to manually run the "node hardening" scripts to add the chron jobs, set max connections, create swap, etc...

    Using the hardening tutorial at http://smartnodes.cc/ isnt difficult. However, to do it on large sets of nodes (10's, or even 100's)     can be very time consuming, and can increase the chance of human error. 

    By running a single command...
    
    "ansible-playbook -K prod-harden.yml"
    
    ...it will automatically harden all nodes.
    
Notes about my environment: 
      I have one server with the hostname of "main", one with a hostname of "testnode1", and all of my nodes are named "node1", etc...         I use "main" as a monitoring server, as well as the server which I run all of my playbooks from.
      
Installing and Configuring Ansible:
      1) 
     
     



Current Playbooks:
  Harden: 
      Description: 
            This playbook currently creates the /smartnode/ directory, downloads the makerun.sh, checkdaemon.sh, and clearlog.sh                     scripts and creates the cronjobs.
      ToDo: 
            Add max connections to smartcash.conf
      
      
  Swap: 
      Description: 
            This playbook creates swap files for your nodes. It can be run multiples times, and will skip nodes where the swap                       already exists.

  Monitor: 
      Description: 
            I am using Open Source Monitoring Distribution/Nagios/Check_mk to monitor resources, etc... for my nodes. This playbook                 Installs check-mk-agent and adds the "main" server ip to the check_mk config file on all nodes, 
      ToDo: 
            Add installation and configuration of OMD on "main" server


Future Playbooks:
  NewNode:
      Requirements:
            Leverage vultr api to find the current max node number, and create one more nodes with an incremented naming convention,                    using a specified snapshot file
            Dynamically update hostname on new nodes
            Update a csv file on main server with hostname and ip
            Run all other necessary playbooks, i.e. harden, swap, monitor, etc...
                      
  Upgrade:
      Requirements:
            Create backups of blocks and important files
            Upgrade wallet on all nodes
            
            
            
            



