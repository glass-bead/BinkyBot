    const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

    module.exports = {
        data: new SlashCommandBuilder()
            .setName('set')
            .setDescription('Admin settings for Binky bot')
            .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
            .addSubcommand(subcommand =>
                subcommand
                    .setName('role')
                    .setDescription('Admin Settings: set new member role')
                    .addMentionableOption(option =>
                        option
                            .setName('role_id')
                            .setDescription('Select role ID')
                            .setRequired(true)
                        ),
            )
            .addSubcommand(subcommand =>
                subcommand
                    .setName('channel')
                    .setDescription('Admin Settings: set channel for welcome message')
                    .addChannelOption(option =>
                        option
                            .setName('channel_id')
                            .setDescription('Select channel ID')
                            .setRequired(true)
                        ),
            ),
        async execute(interaction) {
            var subcommand = interaction.options.getSubcommand();
        
            if (subcommand === 'role') {
                const role = interaction.options.getMentionable('role_id');
                
                // Set new user role
                global.newRole = role;

                await interaction.reply(`New user role was set to ${role} !!`);
            }
            else if (subcommand === 'channel') {
                const channel = interaction.options.getChannel('channel_id');
                
                // Set welcome channel
                global.welcomeChannel = channel;

                await interaction.reply(`Welcome channel was set to ${channel} !!`);
            }
        },
    };